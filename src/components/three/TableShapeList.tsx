import { Shapes } from "@/types/types";
import { Tabletop } from "./Tabletop";
import { useTableStore } from "../../store/Tablestore";
import { useLevaDebug } from "@/hooks/useLevaDebug";

export const TableShapeList = () => {
  useLevaDebug();
  const listShapes = ["rectangle", "oval", "ellipse", "abu", "pebble", "paper"];
  const currentShape = useTableStore((state) => state.tableShape);
  const width = useTableStore((state) => state.tableWidth);
  const currentShapeIndex = listShapes.indexOf(currentShape);

  return (
    <>
      {/* <Tabletop tableShape="oval" positionZ={0} />
      <Tabletop tableShape="oval" positionZ={1} /> */}
      {listShapes.map((x, index) => (
        <Tabletop key={index} tableShape={x as Shapes} positionZ={-1 * ((currentShapeIndex - index) * width + 1 * (currentShapeIndex - index))} />
      ))}
    </>
  );
};
