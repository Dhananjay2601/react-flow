import React, { useEffect } from "react";
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

const ReactFlowComponent = ({ setSelectedNode }: { setSelectedNode: any }) => {
  const dispatch = useDispatch();

  const nodes = useSelector((state: RootState) => state.graph.present.nodes);
  const edges = useSelector((state: RootState) => state.graph.present.edges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={(e) => dispatch(onNodesChange(e))}
      onEdgesChange={(e) => dispatch(onEdgesChange(e))}
      onConnect={(e) => dispatch(onConnect(e))}
      style={{
        backgroundColor: "#F7F9FB",
        borderRadius: "6px",
      }}
      fitView
      onNodeClick={(_, node: Node) => {
        setSelectedNode(node);
      }}
      onNodeDragStart={(_, node: Node) => {
        setSelectedNode(node);
      }}
      onPaneClick={() => {
        setSelectedNode(null);
      }}
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default ReactFlowComponent;
