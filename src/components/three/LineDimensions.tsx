import { Html } from "@react-three/drei";
import { useTableStore } from "../../store/Tablestore";
// import { Vector3 } from "three";
// import { motion } from "framer-motion-3d";
import styled from "styled-components";

export const LineDimensions = () => {
  const length = useTableStore((state) => state.tableLength);
  const width = useTableStore((state) => state.tableWidth);
  const thickness = useTableStore((state) => state.tableThickness);
  const step = useTableStore((state) => state.step);
  const offset = 0.1;
  const show = step === 1;

  return (
    <>
      <group>
        <Html position={[0, -thickness / 2, -width / 2 - offset]} center transform rotation={[-Math.PI / 2, 0, Math.PI]} distanceFactor={1}>
          <LineLength $scale={length} $show={show} />
        </Html>
        <Html position={[0, -thickness / 2, -width / 2 - offset]} center transform rotation={[-Math.PI / 2, 0, 0]} distanceFactor={1}>
          <MeasurmentBorder $show={show}>
            <Measurment $show={show} $value={(length * 100).toFixed(0) + " cm"}>
              {(length * 100).toFixed(0)} cm
            </Measurment>
          </MeasurmentBorder>
        </Html>

        <Html
          position={[length / 2 - 0.0025, -thickness / 2, -width / 2 - offset]}
          center
          transform
          rotation={[-Math.PI / 2, 0, Math.PI]}
          distanceFactor={1}
        >
          <Circle $show={show} />
        </Html>

        <Html
          position={[-length / 2 + 0.0025, -thickness / 2, -width / 2 - offset]}
          center
          transform
          rotation={[-Math.PI / 2, 0, Math.PI]}
          distanceFactor={1}
        >
          <Circle $show={show} />
        </Html>
      </group>
      <group>
        <Html position={[-length / 2 - offset, -thickness / 2, 0]} center transform rotation={[-Math.PI / 2, 0, Math.PI / 2]} distanceFactor={1}>
          <LineWidth $scale={width} $show={show} />
        </Html>
        <Html position={[-length / 2 - offset, -thickness / 2, 0]} center transform rotation={[-Math.PI / 2, 0, Math.PI / 2]} distanceFactor={1}>
          <MeasurmentBorder $show={show}>
            <Measurment $show={show} $value={(width * 100).toFixed(0) + " cm"}>
              {(width * 100).toFixed(0)} cm
            </Measurment>
          </MeasurmentBorder>
        </Html>

        <Html
          position={[-length / 2 - offset, -thickness / 2, -width / 2 + 0.0025]}
          center
          transform
          rotation={[-Math.PI / 2, 0, Math.PI]}
          distanceFactor={1}
        >
          <Circle $show={step === 1} />
        </Html>

        <Html
          position={[-length / 2 - offset, -thickness / 2, width / 2 - 0.0025]}
          center
          transform
          rotation={[-Math.PI / 2, 0, Math.PI]}
          distanceFactor={1}
        >
          <Circle $show={step === 1} />
        </Html>
      </group>
    </>
  );
};

const LineLength = styled.div<{ $scale: number; $show: boolean }>`
  width: ${(props) => props.$scale * 400}px;
  height: 1px;
  background-color: #3b444b;
  transform: scaleX(${(props) => (props.$show ? 1 : 0)});
  transition: ${(props) => (props.$show ? "all 0.3s 0.2s ease-in-out" : "all 0.2s 0.4s ease-in-out")};
  /* transform: scaleX(${(props) => props.$scale}); */
`;

const LineWidth = styled.div<{ $scale: number; $show: boolean }>`
  width: ${(props) => props.$scale * 400}px;
  height: 1px;
  transform: scaleX(${(props) => (props.$show ? 1 : 0)});
  background-color: #3b444b;
  transition: ${(props) => (props.$show ? "all 0.3s 0.2s ease-in-out" : "all 0.2s 0.4s ease-in-out")};
  /* transform: scaleX(${(props) => props.$scale}); */
`;

const MeasurmentBorder = styled.div<{ $show: boolean }>`
  border: 1px solid #3b444b;
  width: 4rem;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transition: ${(props) => (props.$show ? "all 0.3s ease-in-out" : "all 0.3s 0.6s ease-in-out")};

  &::before {
    content: "";
    display: block;
    position: absolute;
    height: 110%;
    width: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
  }
`;

const Measurment = styled.p<{ $value: string; $show: boolean }>`
  white-space: nowrap;
  font-size: 12px;
  padding: 0 0.75em;
  position: relative;
  background-color: white;
  text-align: center;
`;

const Circle = styled.div<{ $show: boolean }>`
  width: 5px;
  height: 5px;
  border-radius: 1px;
  background-color: #3b444b;
  transform: scaleX(${(props) => (props.$show ? 1 : 0)});
  transition: ${(props) => (props.$show ? "all 0.3s 0.6s cubic-bezier(0.02, -0.07, 0, 1.82)" : "all 0.2s ease-in-out")};
`;
