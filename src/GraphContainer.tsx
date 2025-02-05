import { ReactFlowProvider } from "@xyflow/react";
import ReactFlowComponent from "./components/ReactFlowComponent";
import NodeCustomizationPanel from "./components/NodeCustomizationPanel";
import { Panel, Node } from "@xyflow/react";
import { Box, Button, Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { CancelOutlined, Redo, Undo } from "@mui/icons-material";
import { RootState } from "./redux/store";
import { redo, undo } from "./redux/graphSlice";
const GraphContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedNode, setSelectedNode] = useState<Node>({} as Node);
  const [openModal, setOpenModal] = useState(false);

  const { past, future } = useSelector((state: RootState) => state.graph);

  const handleUndo = () => {
    if (past.length > 0) {
      dispatch(undo());
    }
  };

  const handleRedo = () => {
    if (future.length > 0) {
      dispatch(redo());
    }
  };

  return (
    <ReactFlowProvider>
      <Box
        className="flex flex-col flex-grow"
        sx={{
          height: 500,
        }}
      >
        <Button onClick={() => setOpenModal(!openModal)}>
          Customize Panel
        </Button>
        <ReactFlowComponent setSelectedNode={setSelectedNode} />
        {openModal && (
          <Panel className="flex justify-center" position="bottom-right">
            <Card className="bg-white/90 dark:bg-gray-900 shadow-lg rounded-xl p-4 flex flex-col gap-4 ">
              <Box className="flex justify-end">
                <Box
                  className="cursor-pointer"
                  onClick={() => setOpenModal(false)}
                >
                  <CancelOutlined color="primary" />
                </Box>
              </Box>

              <Box className="flex gap-2 justify-center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUndo}
                  startIcon={<Undo />}
                  disabled={past.length === 0}
                >
                  Undo
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRedo}
                  endIcon={<Redo />}
                  disabled={future.length === 0}
                >
                  Redo
                </Button>
              </Box>
              <NodeCustomizationPanel selectedNodeId={selectedNode?.id} />
            </Card>
          </Panel>
        )}
      </Box>
    </ReactFlowProvider>
  );
};

export default GraphContainer;
