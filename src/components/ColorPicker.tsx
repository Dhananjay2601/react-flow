import { CompactPicker } from "react-color";
import { updateNodeColor } from "../redux/graphSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface ColorPickerPropTypes {
  selectedNodeId: string;
}

const ColorPicker = ({ selectedNodeId }: ColorPickerPropTypes) => {
  const dispatch = useDispatch();

  const selectedNode = useSelector((state: RootState) =>
    state.graph.present.nodes.find((node) => node.id === selectedNodeId)
  );

  const handleColorChange = (color: any) => {
    const newColor = color.hex;

    dispatch(
      updateNodeColor({
        id: selectedNodeId,
        color: newColor,
      })
    );
  };

  return (
    <CompactPicker
      color={selectedNode?.style?.backgroundColor ?? "#ffffff"}
      onChange={handleColorChange}
    />
  );
};

export default ColorPicker;
