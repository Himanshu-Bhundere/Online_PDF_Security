import React, { useState, useEffect } from "react";

const ViewBooks = ({ state, setRequester, setCurrBook }) => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const getAllBooks = async () => {
      console.log("inseid function 3");
      const { contract } = state;

      if (contract) {
        const result = await contract.getAllBooks();
        setAllBooks(result);
      }
    };
    getAllBooks();
  }, [state]);

  const getRequesters = async (isbn) => {
    console.log("inseid function getrequesters");
    const { contract } = state;

    if (contract) {
      const result = await contract.getRequesters(isbn);
      console.log(result);
      setCurrBook(isbn);
      setRequester(result);
    }
  };

  return (
    <div className="all-books">
      <h3>All books Available</h3>
      <div className="books-all">
        {allBooks.map((book, index) => {
          const { title, author, isbn, price } = book;
          return (
            <div className="view-book">
              <h2>{title}</h2>
              <button onClick={() => getRequesters(isbn)}>
                Get Requesters
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewBooks;
