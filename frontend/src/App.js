import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Tree from "./Tree";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/tree")
      .then((response) => {
        setData(response.data[0]);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [data]);

  return (
    <div
      style={{ color: "#406149", background: "#b0bfb4", paddingBottom: "16px" }}
    >
      <h1>Tree Visualizer</h1>
      <h2>Mouse over to add, edit, and delete</h2>
      {data ? <Tree data={data} /> : <></>}
    </div>
  );
}

export default App;
