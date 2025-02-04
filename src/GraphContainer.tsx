import { ReactFlowProvider } from "@xyflow/react";
import ReactFlowComponent from "./components/ReactFlowComponent";

const GraphContainer: React.FC = () => {
  return (
    <div className="providerflow" style={{ height: 500 }}>
      <ReactFlowProvider>
        <ReactFlowComponent />
      </ReactFlowProvider>
    </div>
  );
};

export default GraphContainer;
