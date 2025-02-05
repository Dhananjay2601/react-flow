import React from "react";
import ColorPicker from "./ColorPicker";
import FontSizeControl from "./FontSizeControl";
import { Node } from "@xyflow/react";
import { Box } from "@mui/material";

const NodeCustomizationPanel = ({
  selectedNodeId,
}: {
  selectedNodeId: string;
}) => {
  return (
    <Box className="p-3 gap-4 flex flex-col">
      <ColorPicker selectedNodeId={selectedNodeId} />
      <FontSizeControl selectedNodeId={selectedNodeId} />
    </Box>
  );
};

export default NodeCustomizationPanel;
