import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import AllBooks from "./Components/AllBooks";
import Bookviewer from "./Components/Bookviewer";
import abi from "./contracts/pdfsec.json";
import AddaBook from "./Components/AddaBook";
import MyBooks from "./Components/MyBooks";
import UploadPage from "./Components/UploadPage";
const { ethers } = require("ethers");

function App() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [cid, setCID] = useState(null);

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [addBookModal, setAddBookModal] = useState(false);

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

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await axios.get(`https://ipfs.io/ipfs/${cid}`, {
          responseType: "blob",
        });
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };
    fetchPDF();
    setPageNumber(1);
  }, [cid]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  function changePage(offSet) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }
  return (
    <div className="App">
      <Navbar
        state={state}
        setAddBookModal={setAddBookModal}
        addBookModal={addBookModal}
      />
      {addBookModal && <AddaBook state={state} style={{ zIndex: 1 }} />}
      <AllBooks setCID={setCID} state={state} />
      <MyBooks setCID={setCID} state={state} />
      {/* <UploadPage /> */}
      <Bookviewer
        pdfUrl={pdfUrl}
        onDocumentLoadSuccess={onDocumentLoadSuccess}
        pageNumber={pageNumber}
        changePage={changePage}
        numPages={numPages}
        style={{ zIndex: -1 }}
      />
    </div>
  );
}

export default App;
