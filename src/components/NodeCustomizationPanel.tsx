import React from "react";
import ColorPicker from "./ColorPicker";
import FontSizeControl from "./FontSizeControl";
import { Node } from "@xyflow/react";

const NodeCustomizationPanel = ({ selectedNode }: { selectedNode: Node }) => {
  if (!selectedNode) return null;

  return (
    <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
      <h3>Node Customization</h3>
      <ColorPicker selectedNodeId={selectedNode.id} />
      <FontSizeControl selectedNode={selectedNode} />
    </div>
  );
};

export default NodeCustomizationPanel;
