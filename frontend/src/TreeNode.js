import React, { useState } from "react";
import { updateNode, addNode, removeNode } from "./helpers";

// Recursive TreeNode component where most of the stuff happens
const TreeNode = ({ node }) => {
  const [expanded, setExpanded] = useState(node.expanded);
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(node.label);
  const [hovered, setHovered] = useState(false);

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const handleExpanded = () => {
    setExpanded(!expanded);
    updateNode(node.id, node.label, !node.expanded);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditing(false);
      updateNode(node.id, label, node.expanded);
    }
  };

  return (
    <div style={{ marginLeft: "16px" }}>
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "4px",
          borderRadius: "4px",
          transition: "background-color 0.2s",
          position: "relative",
        }}
        onClick={() => handleExpanded()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {node.children.length > 0 && (
          <span style={{ fontSize: "14px" }}>{expanded ? "▼" : "▶"}</span>
        )}
        {editing ? (
          <input
            type="text"
            value={label}
            onChange={handleLabelChange}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{
              fontWeight: "500",
              color: "#333",
              padding: "2px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        ) : (
          <span style={{ fontWeight: "500", color: "#333" }}>{label}</span>
        )}
        {hovered && !editing && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditing(true);
              }}
              style={{
                padding: "2px 6px",
                fontSize: "12px",
                cursor: "pointer",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "#f9f9f9",
              }}
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeNode(node.id);
              }}
              style={{
                padding: "2px 6px",
                fontSize: "12px",
                cursor: "pointer",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "#f0f0f0",
              }}
            >
              Delete
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addNode(node.id);
              }}
              style={{
                padding: "2px 6px",
                fontSize: "12px",
                cursor: "pointer",
                borderRadius: "4px",
                border: "1px solid #ccc",
                backgroundColor: "#f0f0f0",
              }}
            >
              Add Child
            </button>
          </>
        )}
      </div>
      {expanded && node.children.length > 0 && (
        <div
          style={{
            marginLeft: "16px",
            borderLeft: "2px solid #ddd",
            paddingLeft: "8px",
          }}
        >
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
