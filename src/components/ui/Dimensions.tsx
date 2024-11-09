import styled from "styled-components";
import { useTableStore } from "../../store/Tablestore";
// import { generateRange } from "@/lib/functions";

export const Dimensions = () => {
  const length = useTableStore((state) => state.tableLength);
  const width = useTableStore((state) => state.tableWidth);
  const step = useTableStore((state) => state.step);

  // const lengthOptions = generateRange([200, 300], 5);

  return (
    <>
      <Container $show={step === 1}>
        <InnerContainer>
          <DimensionValue>{length * 100}</DimensionValue>
          <DimensionValue>x</DimensionValue>
          <DimensionValue>{width * 100}</DimensionValue>
        </InnerContainer>
        <Circle>
          <Icon src="/upDownArrow.svg" />
          <Icon src="/upDownArrow.svg" />
        </Circle>
      </Container>
      {/* <OptionsContainer>
        <LengthOptionsContainer>
          {lengthOptions.map((x) => (
            <p>{x}</p>
          ))}
        </LengthOptionsContainer>
        <p>x</p>
        <p>100</p>
      </OptionsContainer> */}
    </>
  );
};

// const OptionsContainer = styled.div`
//   position: absolute;
//   bottom: 7rem;
//   left: 50%;
//   transform: translateX(-50%);
//   border: 1px solid;
//   justify-content: space-between;
//   display: flex;
//   width: 220px;
// `;

// const LengthOptionsContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

const Container = styled.div<{ $show: boolean }>`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transform: ${(props) => (props.$show ? "translateX(-50%) scale(1)" : "translateX(-50%) scale(0)")};
  transition: ${(props) => (props.$show ? "all 0.4s cubic-bezier(.29,-0.6,.59,1.81)" : "all 0.3s 0.3s cubic-bezier(.29,-0.6,.77,.61)")};

  &:hover {
    div:last-child {
      img {
        transform: translateY(-100%) rotate(90deg);
      }
    }
  }
`;

const InnerContainer = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
  height: 100%;
  align-items: center;
  padding-left: 24px;
`;

const Circle = styled.div`
  height: 32px;
  aspect-ratio: 1;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  margin: 8px 10px;
  background-color: #ffe4c9;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
  transition: all 0.3s cubic-bezier(0.02, -0.07, 0.18, 1.31);
`;

const DimensionValue = styled.p`
  font-weight: 300;
  font-size: 14px;
`;
