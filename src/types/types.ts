export type Shapes = "circle" | "rectangle" | "oval" | "ellipse" | "abu";

export interface Point {
  x: number;
  y: number;
}

export interface PointOffset {
  pos: Point;
  nor: Point;
}
