import { TwitterPicker } from "react-color";
import { updateNodeColor } from "../redux/graphSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import toast, { Toaster } from "react-hot-toast";

interface ColorPickerPropTypes {
  selectedNodeId?: string;
}

const ColorPicker = ({ selectedNodeId }: ColorPickerPropTypes) => {
  const dispatch = useDispatch();

  const selectedNode = useSelector((state: RootState) =>
    state.graph.present.nodes.find((node) => node.id === selectedNodeId)
  );

  if (!selectedNodeId && !selectedNode) {
    toast("Please select a node to customize", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  }
  console.log("color picker>>", selectedNodeId, selectedNode);

  const handleColorChange = (color: any) => {
    const newColor = color.hex;

    dispatch(
      updateNodeColor({
        id: selectedNodeId ?? "",
        color: newColor,
      })
    );
  };

  return (
    <>
      <TwitterPicker
        color={selectedNode?.style?.backgroundColor ?? "#ffffff"}
        onChange={handleColorChange}
      />
      <Toaster />
    </>
  );
};

export default ColorPicker;
