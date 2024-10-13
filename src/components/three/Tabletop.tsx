/* eslint-disable react-hooks/exhaustive-deps */
import { BufferAttribute, Mesh, Shape } from "three";
import { useEffect, useMemo, useRef } from "react";
import { useShape } from "@/hooks/useShape";
import { PointOffset, Shapes } from "@/types/types";
import { makeOffsetPoly, orderPointsByProximity, seamlessUVs } from "@/lib/functions";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { useTableStore } from "../../store/Tablestore";
import { useLevaDebug } from "@/hooks/useLevaDebug";
import { TabletopMaterial } from "./TabletopMaterial";

export const Tabletop = () => {
  useLevaDebug();
  const tableRef = useRef<Mesh>(null);
  const store = useTableStore();

  const shapingFunction = useShape(store.tableShape as Shapes);

  const cubes = useRef<PointOffset[]>([]);

  const geometry = useMemo(() => {
    return new Shape(shapingFunction());
  }, [store]);

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
        vertexNormals[i + 0] = store.tableShape === "rectangle" ? -nor!.x : nor!.x;
        vertexNormals[i + 1] = store.tableShape === "rectangle" ? -nor!.y : nor!.y;
        vertexNormals[i + 2] = 0;
      }
      tableRef.current.geometry.setAttribute("normal2D", new BufferAttribute(vertexNormals, 3));
      cubes.current = offsetData;
      seamlessUVs(tableRef.current.geometry, store.tableLength * 0.5, store.tableWidth * 0.5);
    }
  });

  return (
    <>
      {/* {cubes.current &&
        cubes.current.map((x, key) => (
          <Box
            material-color={key === store.selectedCube ? "#f00" : "#fff"}
            key={key}
            position={[x.pos.x, 0.1, x.pos.y]}
            rotation-y={Math.atan2(x.nor.x, x.nor.y)}
            scale={new Vector3(0.005, 0.05, 0.05)}
          />
        ))} */}
      <mesh rotation={[Math.PI / 2, 0, 0]} ref={tableRef} position={[0, 0.73, 0]}>
        <extrudeGeometry args={[geometry, { bevelEnabled: false, depth: store.tableThickness, steps: store.tableSteps }]} />
        <TabletopMaterial />
        {/* <meshStandardMaterial wireframe={debug.wireframe} map={map} /> */}
      </mesh>
    </>
  );
};
