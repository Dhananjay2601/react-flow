import React from "react";
import GraphContainer from "./GraphContainer";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      style={{
        height: "100vh",
        width: "100vw",
        padding: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
      }}
    >
      <GraphContainer />
    </Box>
  );
}

export default App;
