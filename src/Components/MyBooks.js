import React, { useState, useEffect } from "react";
import "./MyBooks.css";
import allbooks from "./mybooks.json";
import MyBook from "./MyBook";

const MyBooks = ({ setCID, state }) => {
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    const getAllBooks = async () => {
      console.log("inseid function 3");
      const { contract } = state;
      if (contract) {
        const result = await contract.getMyBooks();
        setAllBooks(result);
      }
    };
    getAllBooks();
  }, [state]);

  return (
    <div className="all-books">
      <h2>My Books</h2>
      <div className="books-all">
        {allBooks.map((book, index) => {
          return (
            <MyBook key={index} book={book} setCID={setCID} state={state} />
          );
        })}
      </div>
    </div>
  );
};

export default MyBooks;
