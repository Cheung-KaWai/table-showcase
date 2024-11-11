import { Html } from "@react-three/drei";
import { useTableStore } from "../../store/Tablestore";
// import { Vector3 } from "three";
// import { motion } from "framer-motion-3d";
import styled from "styled-components";
import { useState } from "react";
import { motion } from "framer-motion-3d";

export const LineDimensions = () => {
  const length = useTableStore((state) => state.tableLength);
  const width = useTableStore((state) => state.tableWidth);
  const thickness = useTableStore((state) => state.tableThickness);
  const step = useTableStore((state) => state.step);
  const offset = 0.1;
  const show = step === 1;

  const [hoverLength, setHoverLength] = useState(false);
  const [hoverWidth, setHoverWidth] = useState(false);

  return (
    <>
      <group>
        <motion.group
          position={[0, -thickness / 2, -width / 2 - offset]}
          animate={{ z: -width / 2 - offset }}
          transition={{ ease: "linear", duration: 0.6 }}
        >
          <Html center transform rotation={[-Math.PI / 2, 0, Math.PI]} distanceFactor={1} zIndexRange={[0, 0]}>
            <LineLength $scale={length} $show={show} />
          </Html>
        </motion.group>
        <motion.group
          position={[0, -thickness / 2, -width / 2 - offset]}
          animate={{ z: -width / 2 - offset }}
          transition={{ ease: "linear", duration: 0.6 }}
        >
          <Html center transform rotation={[-Math.PI / 2, 0, 0]} distanceFactor={1}>
            <MeasurmentBorder $show={show} onMouseEnter={() => setHoverLength(true)} onMouseLeave={() => setHoverLength(false)} $hover={hoverLength}>
              <Measurment $show={show} $value={(length * 100).toFixed(0) + " cm"}>
                <Icon />
                {(length * 100).toFixed(0)} cm <Icon></Icon>
              </Measurment>
            </MeasurmentBorder>
          </Html>
        </motion.group>
        <motion.group
          position={[length / 2 - 0.0025, -thickness / 2, -width / 2 - offset]}
          animate={{ x: length / 2 - 0.0025, z: -width / 2 - offset }}
          transition={{ ease: "linear", duration: 0.6 }}
        >
          <Html center transform rotation={[-Math.PI / 2, 0, Math.PI]} distanceFactor={1} zIndexRange={[0, 0]}>
            <Circle $show={show} />
          </Html>
        </motion.group>

        <motion.group
          position={[-length / 2 + 0.0025, -thickness / 2, -width / 2 - offset]}
          animate={{ x: -length / 2 + 0.0025, z: -width / 2 - offset }}
          transition={{ ease: "linear", duration: 0.6 }}
        >
          <Html center transform rotation={[-Math.PI / 2, 0, Math.PI]} distanceFactor={1} zIndexRange={[0, 0]}>
            <Circle $show={show} />
          </Html>
        </motion.group>
      </group>
      <group>
        <motion.group
          position={[-length / 2 - offset, -thickness / 2, 0]}
          animate={{ x: -length / 2 - offset }}
          transition={{ ease: "linear", duration: 0.6 }}
        >
          <Html center transform rotation={[-Math.PI / 2, 0, Math.PI / 2]} distanceFactor={1} zIndexRange={[0, 0]}>
            <LineWidth $scale={width} $show={show} />
          </Html>
        </motion.group>

        <motion.group
          position={[-length / 2 - offset, -thickness / 2, 0]}
          animate={{ x: -length / 2 - offset }}
          transition={{ ease: "linear", duration: 0.6 }}
        >
          <Html center transform rotation={[-Math.PI / 2, 0, Math.PI / 2]} distanceFactor={1} zIndexRange={[0, 0]}>
            <MeasurmentBorder $show={show} onMouseEnter={() => setHoverWidth(true)} onMouseLeave={() => setHoverWidth(false)} $hover={hoverWidth}>
              <Measurment $show={show} $value={(width * 100).toFixed(0) + " cm"}>
                <Icon /> {(width * 100).toFixed(0)} cm <Icon />
              </Measurment>
            </MeasurmentBorder>
          </Html>
        </motion.group>

        <motion.group
          position={[-length / 2 - offset, -thickness / 2, -width / 2 + 0.0025]}
          animate={{ x: -length / 2 - offset, z: -width / 2 + 0.0025 }}
          transition={{ ease: "linear", duration: 0.6 }}
        >
          <Html center transform rotation={[-Math.PI / 2, 0, Math.PI]} distanceFactor={1} zIndexRange={[0, 0]}>
            <Circle $show={step === 1} />
          </Html>
        </motion.group>

        <motion.group
          position={[-length / 2 - offset, -thickness / 2, width / 2 - 0.0025]}
          animate={{ x: -length / 2 - offset, z: width / 2 - 0.0025 }}
          transition={{ ease: "linear", duration: 0.6 }}
        >
          <Html center transform rotation={[-Math.PI / 2, 0, Math.PI]} distanceFactor={1} zIndexRange={[0, 0]}>
            <Circle $show={step === 1} />
          </Html>
        </motion.group>
      </group>
    </>
  );
};

// const ListOptionsContainer = styled.div`
//   position: absolute;
//   top: -30px;
//   border: 1px solid;
//   width: 6rem;
//   height: 100px;
//   overflow: scroll;
// `;

const LineLength = styled.div<{ $scale: number; $show: boolean }>`
  width: ${(props) => props.$scale * 400}px;
  height: 1px;
  background-color: #3b444b;
  transform: scaleX(${(props) => (props.$show ? 1 : 0)});
  transition: ${(props) => (props.$show ? "all 0.6s linear" : "all 0.2s 0.4s ease-in-out")};
  /* transform: scaleX(${(props) => props.$scale}); */
`;

const LineWidth = styled.div<{ $scale: number; $show: boolean }>`
  width: ${(props) => props.$scale * 400}px;
  height: 1px;
  transform: scaleX(${(props) => (props.$show ? 1 : 0)});
  background-color: #3b444b;
  transition: ${(props) => (props.$show ? "all 0.6s linear" : "all 0.2s 0.4s ease-in-out")};
  /* transform: scaleX(${(props) => props.$scale}); */
`;

const MeasurmentBorder = styled.div<{ $show: boolean; $hover: boolean }>`
  border: 1px solid #3b444b;
  width: ${(props) => (props.$hover ? "6rem" : "6rem")};
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transition: ${(props) => (props.$show ? "all 0.05s ease-in-out" : "all 0.3s 0.6s ease-in-out")};
  cursor: pointer;

  &::before {
    content: "";
    display: block;
    position: absolute;
    height: 110%;
    width: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(255, 253, 244);
  }
`;

const Measurment = styled.p<{ $value: string; $show: boolean }>`
  white-space: nowrap;
  font-size: 12px;
  position: relative;
  background-color: rgb(255, 253, 244);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Circle = styled.div<{ $show: boolean }>`
  width: 5px;
  height: 5px;
  border-radius: 1px;
  background-color: #3b444b;
  transform: scaleX(${(props) => (props.$show ? 1 : 0)});
  transition: ${(props) => (props.$show ? "all 0.3s 0.6s cubic-bezier(0.02, -0.07, 0, 1.82)" : "all 0.2s ease-in-out")};
`;

const Icon = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 1px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  background-color: black;
`;
