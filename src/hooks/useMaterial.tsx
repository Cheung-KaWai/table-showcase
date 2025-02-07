import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { RepeatWrapping, SRGBColorSpace, Vector2 } from "three";
import { useTableStore } from "../store/Tablestore";

export const useMaterial = () => {
  const { gl } = useThree();
  const tableMaterial = useTableStore((state) => state.tableMaterial);
  // const roughness = useTableStore((state) => state.tableRoughness);
  const normalScale = useTableStore((state) => state.tableNormalSCale);
  const color = useTableStore((state) => state.tableColor);
  const map = useTexture(tableMaterial);
  console.log(tableMaterial);
  map.wrapS = map.wrapT = RepeatWrapping;
  map.anisotropy = gl.capabilities.getMaxAnisotropy();
  map.colorSpace = SRGBColorSpace;
  map.flipY = false;

  // const normalMap = useTexture("concrete/normal.png");
  // normalMap.wrapS = normalMap.wrapT = RepeatWrapping;
  // normalMap.anisotropy = gl.capabilities.getMaxAnisotropy();
  // normalMap.colorSpace = LinearSRGBColorSpace;
  // normalMap.flipY = false;

  // const roughnessMap = useTexture("/r3.png");
  // roughnessMap.wrapS = roughnessMap.wrapT = RepeatWrapping;
  // roughnessMap.anisotropy = gl.capabilities.getMaxAnisotropy();
  // roughnessMap.colorSpace = LinearSRGBColorSpace;
  // roughnessMap.flipY = false;

  return {
    map,
    normalScale: new Vector2(normalScale, normalScale),
    metalness: 0,
    // roughness,
    color,
  };
};
