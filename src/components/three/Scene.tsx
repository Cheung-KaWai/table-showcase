import { Canvas } from "@react-three/fiber";
import { Lights } from "./Lights";
import { ACESFilmicToneMapping } from "three";
// import { Tableleg } from "./Tableleg";
import { TableShapeList } from "./TableShapeList";
import { PerfMonitor } from "../primitives/PerfMonitor";
import { Camera } from "./Camera";
import { LineDimensions } from "./LineDimensions";

export const Scene = () => {
  return (
    <Canvas gl={{ toneMappingExposure: 3, toneMapping: ACESFilmicToneMapping }} camera={{ fov: 60 }}>
      <PerfMonitor />
      <TableShapeList />
      <Camera />
      <LineDimensions />
      {/* <Tableleg /> */}
      <Lights />
    </Canvas>
  );
};
