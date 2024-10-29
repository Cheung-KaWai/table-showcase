import { CameraControls } from "@react-three/drei";
import { useRef } from "react";

export const Camera = () => {
  const camRef = useRef<CameraControls>(null);

  return <CameraControls ref={camRef} camera-position={[0.75, 1.25, 1.75]} />;
};
