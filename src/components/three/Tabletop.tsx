/* eslint-disable react-hooks/exhaustive-deps */
import { BufferAttribute, Mesh } from "three";
import { FC, useEffect, useRef } from "react";
import { useShape } from "@/hooks/useShape";
import { PointOffset, Shapes } from "@/types/types";
import { makeOffsetPoly, orderPointsByProximity, seamlessUVs } from "@/lib/functions";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { TabletopMaterial } from "./TabletopMaterial";
import { motion } from "framer-motion-3d";
import { useTableStore } from "../../store/Tablestore";

export const Tabletop: FC<{ tableShape: Shapes; positionZ: number }> = ({ tableShape, positionZ }) => {
  const tableRef = useRef<Mesh>(null);

  const extrudeGeo = useShape(tableShape);

  const cubes = useRef<PointOffset[]>([]);
  const animationSpeed = useTableStore((state) => state.animationspeed);

  // get normal direction for inwards polygon offset
  useEffect(() => {
    if (tableRef.current) {
      //calculate tangets to calculate new normals in fragment shader
      tableRef.current.geometry = mergeVertices(tableRef.current.geometry);
      tableRef.current.geometry.computeTangents();

      const positions = tableRef.current.geometry.attributes.position.array;

      const uniquePositions = [];
      const seen = new Set();

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];

        // Create a key combining x and y to track uniqueness
        const key = `${x},${y}`;

        // Check if the key has already been seen
        if (!seen.has(key)) {
          uniquePositions.push({ x, y }); // Push as {x, y} object
          seen.add(key);
        }
      }

      // Now `uniquePositions` contains only unique x, y pairs as {x, y}
      const sortedUnqiuePoints = orderPointsByProximity(uniquePositions);
      const offsetData = makeOffsetPoly(sortedUnqiuePoints);
      const vertexNormals = new Float32Array(positions.length);
      for (let i = 0; i < vertexNormals.length; i = i + 3) {
        const posX = positions[i + 0];
        const posY = positions[i + 1];
        const nor = offsetData.find((offset) => offset.pos.x === posX && offset.pos.y === posY)?.nor;
        vertexNormals[i + 0] = ["rectangle"].includes(tableShape) ? -nor!.x : nor!.x;
        vertexNormals[i + 1] = ["rectangle"].includes(tableShape) ? -nor!.y : nor!.y;
        vertexNormals[i + 2] = 0;
      }
      tableRef.current.geometry.setAttribute("normal2D", new BufferAttribute(vertexNormals, 3));
      cubes.current = offsetData;
      seamlessUVs(tableRef.current.geometry, 2 * 0.5, 1 * 0.5);
      // console.log("init", tableRef.current);
    }
  }, []);

  return (
    <motion.group position={[0, 0, positionZ]} animate={{ z: positionZ }} transition={{ ease: "linear", duration: 0.3 * animationSpeed }}>
      <mesh rotation={[Math.PI / 2, 0, 0]} ref={tableRef} geometry={extrudeGeo}>
        <TabletopMaterial shape={tableShape} />
      </mesh>
    </motion.group>
  );
};
