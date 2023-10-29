import React, { useEffect, useState } from "react";

const MyBook = ({ book, setCID, state }) => {
  const { title, author, isbn, price } = book;
  const [ipfs_hash, setIPFSHASH] = useState(null);
  let new_isbn;
  useEffect(() => {
    const getIPFSHash = async () => {
      new_isbn = Number(isbn);
      const { contract } = state;
      console.log(contract);
      if (contract) {
        const result = await contract.getIPFSHashFunction(new_isbn);
        setIPFSHASH(result);
      }
    };
    getIPFSHash();
  }, [state]);

  return (
    <div className="book">
      <h2>{title}</h2>
      <p>{author}</p>
      <h2>{price.toString() / 1000000000000000000} ETH</h2>
      <button onClick={() => setCID(ipfs_hash)}>View Book</button>
    </div>
  );
};

export default MyBook;
