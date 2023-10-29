import React from "react";

const GetIPFSHash = async ({ state, isbn }) => {
  console.log("inseid function get hash");
  const { contract } = state;
  if (contract) {
    const result = await contract.ipfs_hash(isbn);
    return result;
  }
};

export default GetIPFSHash;
