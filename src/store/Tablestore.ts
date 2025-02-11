import { create } from "zustand";

interface Tablestate {
  showPerf: boolean;
  tableShape: string;
  tableLength: number;
  tableLengthPrevious: number;
  tableWidth: number;
  tableWithPrevious: number;
  tableDiameter: number;
  tableThickness: number;
  tableSteps: number;
  tablecornerRadius: number;
  tableMaterial: string;
  wireframe: boolean;
  insetBottom: number;
  insetTop: number;
  verticalEdgeThickness: number;
  tableRoughness: number;
  tableNormalSCale: number;
  tableColor: string;
  tableColorPrevious: string;
  tabletColorTransition: number;
  shift: number;
  currentEdge: number;
  previousEdge: number;
  uniquePoints: Array<{ x: number; y: number }>;
  selectedCube: number;
  step: number;
  animationspeed: number;
  update: (options: Partial<Tablestate>) => void;
}

export const useTableStore = create<Tablestate>()((set) => ({
  showPerf: false,
  tableShape: "rectangle",
  tableLength: 2.4,
  tableLengthPrevious: 2.4,
  tableWidth: 1,
  tableWithPrevious: 1,
  tableDiameter: 1,
  tablecornerRadius: 0,
  tableMaterial: "concrete/color.jpg",
  tableThickness: 0.04,
  tableSteps: 40,
  wireframe: false,
  insetBottom: 2,
  insetTop: -0.005,
  verticalEdgeThickness: 0.01,
  tableRoughness: 0.7,
  tableNormalSCale: 0.3,
  tableColor: "#ffc494",
  tableColorPrevious: "#ffc494",
  tabletColorTransition: 0,
  shift: 0.001,
  currentEdge: 0,
  previousEdge: 0,
  uniquePoints: [],
  selectedCube: 0,
  step: 0,
  animationspeed: 1,
  update: (options) => set((state) => ({ ...state, ...options })),
}));
