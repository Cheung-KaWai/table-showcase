/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.2 -t -T leg.glb 
Files: leg.glb [2.9KB] > /Users/kawai/Desktop/table-showcase/public/leg-transformed.glb [1.97KB] (32%)
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { TablelegMaterial } from "./TablelegMaterial";
import { useTableStore } from "../../store/Tablestore";
import { motion } from "framer-motion-3d";

type GLTFResult = GLTF & {
  nodes: {
    Cube001: THREE.Mesh;
  };
};

export function Tableleg() {
  const { scene } = useGLTF("/leg-transformed.glb") as unknown as GLTFResult;
  const length = useTableStore((state) => state.tableLength);
  const offset = 0.5;
  const step = useTableStore((state) => state.step);
  const show = step >= 4;
  return (
    <>
      <motion.group
        animate={{ x: length / 2 - offset }}
        transition={{ ease: "linear", duration: 0.6 }}
        dispose={null}
        position={[length / 2 - offset, -0.74, 0]}
      >
        <mesh geometry={(scene.children[0] as THREE.Mesh).geometry}>
          <TablelegMaterial />
        </mesh>
      </motion.group>
      <motion.group
        animate={{ x: -length / 2 + offset }}
        transition={{ ease: "linear", duration: 0.6 }}
        dispose={null}
        position={[-length / 2 + offset, -0.74, 0]}
      >
        <mesh geometry={(scene.children[0] as THREE.Mesh).geometry}>
          <TablelegMaterial />
        </mesh>
      </motion.group>
    </>
  );
}

useGLTF.preload("/leg-transformed.glb");
