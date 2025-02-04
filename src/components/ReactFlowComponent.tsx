import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactFlow, Background, Controls, Panel, Node } from "@xyflow/react";
import {
  onNodesChange,
  onEdgesChange,
  onConnect,
  undo,
  redo,
} from "../redux/graphSlice";
import { RootState } from "../redux/store";

import "@xyflow/react/dist/style.css";
import NodeCustomizationPanel from "../components/NodeCustomizationPanel";
import { Button } from "@mui/material";

const ReactFlowComponent = () => {
  const dispatch = useDispatch();
  const [selectedNode, setSelectedNode] = useState<Node>();

  const nodes = useSelector((state: RootState) => state.graph.present.nodes);
  const edges = useSelector((state: RootState) => state.graph.present.edges);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "z") {
        dispatch(undo());
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "y") {
        dispatch(redo());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={(e) => dispatch(onNodesChange(e))}
      onEdgesChange={(e) => dispatch(onEdgesChange(e))}
      onConnect={(e) => dispatch(onConnect(e))}
      style={{ backgroundColor: "#F7F9FB" }}
      fitView
      onNodeClick={(_, node: Node) => {
        setSelectedNode(node);
      }}
    >
      <Panel
        position="top-right"
        className="bg-amber-700"
        style={{ display: "flex", gap: "10px", flexDirection: "column" }}
      >
        <Button onClick={() => dispatch(undo())}>Undo</Button>
        <Button onClick={() => dispatch(redo())}>Redo</Button>
        {selectedNode && <NodeCustomizationPanel selectedNode={selectedNode} />}
      </Panel>
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default ReactFlowComponent;
