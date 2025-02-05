import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Node } from "@xyflow/react";
import { Box } from "@mui/material";
import { RootState } from "../redux/store";
import { updateNodeFontSize } from "../redux/graphSlice";

const FontSizeControl = ({ selectedNodeId }: { selectedNodeId?: string }) => {
  const dispatch = useDispatch();
  const node = useSelector((state: RootState) =>
    state.graph.present.nodes.find((node: Node) => node.id === selectedNodeId)
  );

  const fontSize = node?.style?.fontSize ?? 16;

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFontSize = parseInt(e.target.value, 10);
    dispatch(updateNodeFontSize({ id: node?.id, fontSize: newFontSize }));
  };

  return (
    <Box className="flex flex-row items-center gap-3 ">
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
    </Box>
  );
};

export default FontSizeControl;
