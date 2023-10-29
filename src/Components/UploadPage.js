import React, { useState } from "react";
import { create } from "ipfs-http-client";
window.Buffer = window.Buffer || require("buffer").Buffer;
const projectId = "2Wy1dXQ6FjG6IXJ2cV2aDq3LO8E";
const projectSecret = "522d916c9d4e7a1df4cae5386396bb7a";

const auth =
  "Basic" +
  " " +
  Buffer.from(projectId + ":" + projectSecret).toString("base64");

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState(null);
  const [link, setLink] = useState(null);

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

  const uploadFile = async () => {
    let ipfs = await ipfsClient();
    const result = await ipfs.add(file);
    console.log(result);
    setHash(result.path);
    setLink("https://ipfs.io/ipfs/" + result.path);
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>
      {hash && (
        <p>
          File uploaded with hash: {hash} <br />
          <a href={link}>Link</a>
        </p>
      )}
    </div>
  );
};

export default UploadPage;
