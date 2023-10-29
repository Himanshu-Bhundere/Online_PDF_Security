import React from "react";
import { Document, Page } from "react-pdf";
const Bookviewer = ({
  pdfUrl,
  onDocumentLoadSuccess,
  pageNumber,
  numPages,
  changePage,
}) => {
  function changePageBack() {
    changePage(-1);
  }

  function changePageNext() {
    changePage(+1);
  }
  return (
    <div className="pdf-viewer">
      <h2>Viewing Book</h2>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          className="document"
          // height="600"
          // width="600"
          pageNumber={pageNumber}
        />
      </Document>
      <p>
        {" "}
        Page {pageNumber} of {numPages}
      </p>
      <div>
        {pageNumber > 1 && (
          <button onClick={changePageBack}>Previous Page</button>
        )}
        {pageNumber < numPages && (
          <button onClick={changePageNext}>Next Page</button>
        )}
      </div>
    </div>
  );
};

export default Bookviewer;
