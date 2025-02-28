import React from "react";
import TreeNode from "./TreeNode";

// Main TreeView component
const Tree = ({ data }) => {
  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#d8e6db",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "16px",
          color: "#555",
        }}
      ></h2>
      <TreeNode node={data} />
    </div>
  );
};

export default Tree;
