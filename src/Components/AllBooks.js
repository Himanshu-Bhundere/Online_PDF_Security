import React, { useState, useEffect } from "react";
import Books from "./Books";

const AllBooks = ({ state }) => {
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

  return (
    <div className="all-books">
      <h3>All books Available</h3>
      <div className="books-all">
        {allBooks.map((book, index) => {
          return <Books key={index} book={book} index={index} state={state} />;
        })}
        {/* <button
          onClick={() =>
            setCID("QmT3uZE7ddfjrxR7UzjGmL4JzC1U6xYaRtJiXUXzUCdCfP")
          }
        >
          Book 1
        </button>
        <button
          onClick={() =>
            setCID("QmZmdtexNQFuBVNQyF4ZbmYB7yK77uYN97izoE1yyF1QvL")
          }
        >
          Book 2
        </button> */}
      </div>
    </div>
  );
};

export default AllBooks;
