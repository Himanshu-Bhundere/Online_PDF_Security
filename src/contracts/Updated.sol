// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BookAccessControl {

    event addedBook(address owner, string name, string author); 
    event authorizedReader (uint256 isbn, address reader);
    event accessRequested(uint256 isbn, address reader);
    
    struct Book {
        address owner;
        string title;
        string author;
        uint256 isbn;
        uint256 price;
        address[] authorizedReaders;
        uint authorizedReadersCount;

        // string ipfsHash;

        // mapping(address => bool) authorized;
        // mapping(address => uint256) lastAccessTime;
    }

    struct ViewBook{
        string title;
        string author;
        uint256 isbn;
        uint256 price;
    }

    mapping(uint256 => string) public ipfs_hash;   //isbn => ipfs
    mapping(address => ViewBook[]) users;   //useraddress => ViewBook[]
    mapping(uint256 => Book) public books;  //isbn => Book
    mapping(address => uint256) accessRequests; //useraddress => isbn
    
    address[] accessReqKeys;
    uint256[] books_isbn;

    function addBook(string memory _title, string memory _author, uint256 _isbn, uint256 _price, string memory _ipfs) public {
        require(books[_isbn].isbn == 0, "Book with this ISBN already exists");
        // Book memory temp = 
        books[_isbn] = Book({
            owner: msg.sender, 
            title: _title, 
            author: _author, 
            isbn: _isbn, 
            price: _price * 1 ether, 
            authorizedReaders: new address[](0), 
            authorizedReadersCount: 1
            // ipfsHash: isbn_hash[_isbn]
            });
        ipfs_hash[_isbn] = _ipfs;
        books_isbn.push(_isbn);
        emit addedBook(msg.sender, _title, _author);
    }

    function authorizeReader(uint256 _isbn, address _reader) public payable {
        require(books[_isbn].isbn != 0, "Book with this ISBN does not exist");
        require(msg.sender == books[_isbn].owner, "Only the book owner can authorize readers");
        uint senderString = accessRequests[msg.sender];
        require(senderString > 0);
        books[_isbn].authorizedReadersCount += 1;
        books[_isbn].authorizedReaders.push(_reader);

        ViewBook memory book = ViewBook({
            title: books[_isbn].title,
            author: books[_isbn].author,
            isbn: books[_isbn].isbn,
            price : books[_isbn].price
        });
        users[_reader].push(book);

        emit authorizedReader(_isbn, _reader);
    }

    function requestAccess(uint256 _isbn) public payable {
        require(books[_isbn].isbn != 0, "Book with this ISBN does not exist");
        require(msg.value == books[_isbn].price, "Incorrect payment amount");
        accessRequests[msg.sender] = _isbn;
        accessReqKeys.push(msg.sender);
        emit accessRequested(_isbn, msg.sender);
    }

    function getMyBooks() public view returns (ViewBook[] memory) {
        return users[msg.sender];
    }

    function getBook(uint _isbn) public view returns (ViewBook memory){
        for(uint i = 0; i < users[msg.sender].length; i++){
            if(users[msg.sender][i].isbn == _isbn){
                return users[msg.sender][i];
            }
        }
        revert();
    }

    function getAllBooks() public view returns (ViewBook[] memory){
         ViewBook[] memory viewBooks = new ViewBook[](books_isbn.length);
        for(uint i = 0; i < books_isbn.length; i++){
            viewBooks[i] = ViewBook({
                title: books[books_isbn[i]].title,
                author: books[books_isbn[i]].author,
                isbn: books[books_isbn[i]].isbn,
                price : books[books_isbn[i]].price
            });
        }
        return viewBooks;
    }

    function getAuthorisedReaders(uint _isbn) public view returns (address[] memory){
        require(msg.sender == books[_isbn].owner, "Only owner of the book can use this function");
        return books[_isbn].authorizedReaders;
    }

    function getIPFSHashFunction(uint256 _isbn) public view returns (string memory) {
        return ipfs_hash[_isbn];
    }

    function getRequesters(uint isbn) public view returns (address[] memory){
        require(msg.sender == books[isbn].owner, "Only owner of the book can use this function");
        address[] memory requesters = new address[](accessReqKeys.length);
        uint j = 0;
        for(uint i = 0; i < accessReqKeys.length; i++) {
            if(accessRequests[accessReqKeys[i]] == isbn) {
                requesters[j] = accessReqKeys[i];
                j++;
            }
        }
        return requesters;
    }

}