import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  NodeChange,
  Edge,
  EdgeChange,
  Connection,
} from "@xyflow/react";
import { onNodesChange, onEdgesChange, onConnect } from "../redux/graphSlice";
import { RootState } from "../redux/store";

import "@xyflow/react/dist/style.css";

const ReactFlowComponent = ({ setSelectedNode }: { setSelectedNode: any }) => {
  const dispatch = useDispatch();

  const nodes = useSelector((state: RootState) => state.graph.present.nodes);
  const edges = useSelector((state: RootState) => state.graph.present.edges);

  const handleNodeChange = (event: NodeChange<Node>[]) => {
    dispatch(onNodesChange(event));
  };

  const handleEdgeChange = (event: EdgeChange<Edge>[]) => {
    dispatch(onEdgesChange(event));
  };

  const handleOnConnectChange = (event: Connection) => {
    dispatch(onConnect(event));
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={handleNodeChange}
      onEdgesChange={handleEdgeChange}
      onConnect={handleOnConnectChange}
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
