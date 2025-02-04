import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNodeFontSize } from "../redux/graphSlice";
import { Node } from "@xyflow/react";

const FontSizeControl = ({ selectedNode }: { selectedNode: Node }) => {
  const dispatch = useDispatch();
  const node = useSelector((state: any) =>
    state.graph.present.nodes.find((node: Node) => node.id === selectedNode.id)
  );

  if (!node) return null; // Avoid errors if the node is missing

  const fontSize = node.style?.fontSize ?? 16;

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFontSize = parseInt(e.target.value, 10);
    dispatch(updateNodeFontSize({ id: node.id, fontSize: newFontSize }));
  };

  return (
    <div>
      <label htmlFor="font-size">Font Size: </label>
      <input
        type="range"
        id="font-size"
        min="12"
        max="24"
        step="1"
        value={fontSize}
        onChange={handleFontSizeChange}
      />
      <span>{fontSize}px</span>
    </div>
  );
};

export default FontSizeControl;
