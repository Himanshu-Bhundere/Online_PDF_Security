import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import abi from "../contracts/pdfsec.json";
import ViewBooks from "./ViewBooks";
import "./AuthorizeReader.css";
const { ethers } = require("ethers");
const AuthorizeReader = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [requesters, setRequester] = useState(null);
  const [currBook, setCurrBook] = useState(null);
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x2Ed0100b7085759f4d60be15F370dbBfd17da2e5";
      const contractABI = abi.abi;
      try {
        let provider = new ethers.BrowserProvider(window.ethereum);
        let signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };

    connectWallet();
  }, []);

  const authorizeReaderFunc = async (isbn, reader) => {
    console.log("inseid function authorizeReaderFunc");
    const { contract } = state;

    if (contract) {
      console.log(isbn, reader);
      const result = await contract.authorizeReader(isbn, reader);
      console.log(result);
    }
  };

  return (
    <div>
      {" "}
      <nav class="navbar navbar-expand-xl">
        <div class="container-fluid">
          <a class="logo" href="/">
            PDF-Security
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="nav navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/">
                  Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ViewBooks
        state={state}
        setRequester={setRequester}
        setCurrBook={setCurrBook}
      />
      <div className="requests">
        <h2>Requesters</h2>
        {requesters &&
          requesters.map((requester, index) => {
            return (
              <div className="requester">
                <h4>{"....." + requester.slice(-10)}</h4>
                <button
                  onClick={() => authorizeReaderFunc(currBook, requester)}
                >
                  Authorize
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AuthorizeReader;
