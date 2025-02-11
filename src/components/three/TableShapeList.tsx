import { Shapes } from "@/types/types";
import { Tabletop } from "./Tabletop";
import { useTableStore } from "../../store/Tablestore";
import { useLevaDebug } from "@/hooks/useLevaDebug";
import { listShapes } from "@/data/data";

export const TableShapeList = () => {
  useLevaDebug();

  const currentShape = useTableStore((state) => state.tableShape);
  const width = useTableStore((state) => state.tableWidth);
  const currentShapeIndex = listShapes.findIndex((shape) => shape.id === currentShape);

  return (
    <>
      {/* <Tabletop tableShape="oval" positionZ={0} />
      <Tabletop tableShape="oval" positionZ={1} /> */}
      {listShapes.map((x, index) => (
        <Tabletop key={index} tableShape={x.id as Shapes} positionZ={1 * ((currentShapeIndex - index) * width + 1 * (currentShapeIndex - index))} />
      ))}
    </>
  );
};
