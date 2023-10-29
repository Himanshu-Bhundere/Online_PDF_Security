import React, { useState, useEffect } from "react";
import "./AddaBook.css";
import { create } from "ipfs-http-client";
window.Buffer = window.Buffer || require("buffer").Buffer;
const projectId = "2Wy1dXQ6FjG6IXJ2cV2aDq3LO8E";
const projectSecret = "522d916c9d4e7a1df4cae5386396bb7a";

const auth =
  "Basic" +
  " " +
  Buffer.from(projectId + ":" + projectSecret).toString("base64");

const AddaBook = ({ state }) => {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState(null);
  const [link, setLink] = useState(null);

  const [bookInfo, setBookInfo] = useState({
    title: "",
    author: "",
    isbn: -1,
    price: 0,
    pdfFile: null,
  });

  const ipfsClient = async () => {
    const ipfs = await create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      apiPath: "/api/v0",
      headers: {
        authorization: auth,
      },
    });
    return ipfs;
  };

  // const uploadFile = async () => {
  //   let ipfs = await ipfsClient();
  //   const result = await ipfs.add(file);
  //   console.log(result);
  //   setHash(result.path);
  //   setLink("https://ipfs.io/ipfs/" + result.path);
  // };

  const onChange = (e) => {
    return setBookInfo({ ...bookInfo, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBookInfo({ ...bookInfo, pdfFile: file });
  };

  const addBook = async () => {
    console.log("inseid function 2");
    const { contract } = state;
    console.log(bookInfo);
    console.log(hash);
    if (contract) {
      const result = await contract.addBook(
        bookInfo.title,
        bookInfo.author,
        bookInfo.isbn,
        bookInfo.price,
        hash
      );
      console.log(result);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let ipfs = await ipfsClient();
      await ipfs.add(bookInfo.pdfFile).then((result) => {
        setHash(result.path);
        setLink("https://ipfs.io/ipfs/" + result.path);
        console.log(hash);
      });

      await addBook();
    } catch (error) {
      console.log(error);
    }
    // setBookInfo({
    //   title: "",
    //   author: "",
    //   pdfFile: null,
    // });
  };

  return (
    <div className="add-book-form">
      <h2>Add a Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookInfo.title}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookInfo.author}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="number"
            id="isbn"
            name="isbn"
            value={bookInfo.isbn}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={bookInfo.price}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pdfFile">PDF File:</label>
          <input
            type="file"
            id="pdfFile"
            name="pdfFile"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <button type="submit">Add Book</button>
        </div>
      </form>
    </div>
  );
};

export default AddaBook;
