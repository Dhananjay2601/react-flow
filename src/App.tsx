import React from "react";
import GraphContainer from "./GraphContainer";
import { Box } from "@mui/material";

function App() {
  return (
    <Box className="h-screen w-screen p-10 md:p-16 md:pb-8 flex justify-center items-center bg-black/60">
      <GraphContainer />
    </Box>
  );
}

export default App;
