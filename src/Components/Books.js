import React from "react";
import GetIPFSHash from "./GetIPFSHash";
import "./Books.css";
const { ethers } = require("ethers");

const Books = ({ book, index, state }) => {
  const { title, author, isbn, price, ipfs } = book;

  const RequestBook = async () => {
    console.log("inseid function Request book");
    const { contract } = state;
    if (contract) {
      let amount = price.toString() / 1000000000000000000;
      amount = amount.toString();
      const result = await contract.requestAccess(isbn, {
        value: ethers.parseEther(amount),
      });
      console.log(result);
    }
  };

  return (
    <div className="book">
      <h2>{title}</h2>
      <p>{author}</p>
      <h2>{price.toString() / 1000000000000000000} ETH</h2>
      <button onClick={() => RequestBook()}>Buy Book</button>
    </div>
  );
};

export default Books;
