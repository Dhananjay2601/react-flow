export interface SelectedNodeType {
  id: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    label: string;
  };
  type: string;
  measured: {
    width: number;
    height: number;
  };
  selected: boolean;
  styles: any;
}

export interface Node {
  id: string;
  position: { x: number; y: number };
  data: { label: string };
  type: string;
  style?: { backgroundColor?: string; fontSize?: number };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}

export interface GraphState {
  nodes: Node[];
  edges: Edge[];
}

export interface HistoryState {
  past: GraphState[];
  present: GraphState;
  future: GraphState[];
}
