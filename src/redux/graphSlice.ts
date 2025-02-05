import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import nodes from "../utils/nodes.json";
import edges from "../utils/edges.json";
import { HistoryState } from "../utils/types";

const initialState: HistoryState = {
  past: [],
  present: { nodes: nodes, edges: edges },
  future: [],
};

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    updateNodeText: (state, action) => {
      state.present.nodes = state.present.nodes.map((node) => {
        if (node.id === action.payload.id) {
          node.data = { ...node.data, label: action.payload.text };
        }
        return node;
      });
    },
    updateNodeColor: (
      state,
      action: PayloadAction<{ id: string; color: string }>
    ) => {
      state.present.nodes = state.present.nodes.map((node: any) =>
        node.id === action.payload.id
          ? {
              ...node,
              style: {
                ...node.style,
                backgroundColor: action.payload.color,
              },
            }
          : node
      );
    },
    updateNodeFontSize: (state, action) => {
      state.present.nodes = state.present.nodes.map((node: any) =>
        node.id === action.payload.id
          ? {
              ...node,
              style: {
                ...node.style,
                fontSize: action.payload.fontSize,
              },
            }
          : node
      );
    },

    onNodesChange: (state, action) => {
      const updatedNodes = applyNodeChanges(
        action.payload,
        state.present.nodes
      );
      state.present.nodes = updatedNodes;
      state.past.push({ ...state.present });
      state.future = [];
    },

    onEdgesChange: (state, action) => {
      const updatedEdges = applyEdgeChanges(
        action.payload,
        state.present.edges
      );
      state.present.edges = updatedEdges;
      state.past.push({ ...state.present });
      state.future = [];
    },

    onConnect: (state, action) => {
      state.present.edges = addEdge(action.payload, state.present.edges);
      state.past.push({ ...state.present });
      state.future = [];
    },

    undo: (state) => {
      if (state.past.length > 0) {
        const previousState = state.past.pop();
        if (previousState) {
          state.future.push({ ...state.present });
          state.present = previousState;
        }
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const nextState = state.future.pop();
        if (nextState) {
          state.past.push({ ...state.present });
          state.present = nextState;
        }
      }
    },
  },
});

export const {
  onNodesChange,
  onEdgesChange,
  onConnect,
  updateNodeColor,
  updateNodeText,
  updateNodeFontSize,
  undo,
  redo,
} = graphSlice.actions;

export default graphSlice.reducer;
