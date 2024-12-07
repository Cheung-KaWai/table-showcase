import { useTableStore } from "../../store/Tablestore";
import styled from "styled-components";

const edges = [
  {
    id: 0,
    name: "Straight",
  },
  {
    id: 1,
    name: "Beveled",
  },
  {
    id: 2,
    name: "Inverted",
  },
];

export const EdgeFinish = () => {
  // const edge = useTableStore((state) => state.currentEdge);
  const step = useTableStore((state) => state.step);
  return (
    <>
      <EdgeContainer $show={step === 2}>
        {edges.map((x) => (
          <EdgeElement>{x.name}</EdgeElement>
        ))}
      </EdgeContainer>
    </>
  );
};

const EdgeContainer = styled.div<{ $show: boolean }>`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  transform: ${(props) => (props.$show ? "translateX(-50%) scale(1)" : "translateX(-50%) scale(0)")};
  transition: ${(props) => (props.$show ? "all  0.3s 0.6s cubic-bezier(.29,-0.6,.59,1.81)" : "all 0.4s cubic-bezier(.29,-0.6,.77,.61)")};
`;

const EdgeElement = styled.p`
  backdrop-filter: blur(20px);
  padding: 0.75em 1.5em;
  border-radius: 24px;
  font-size: 14px;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.05);
  font-weight: 300;
  cursor: pointer;
`;
