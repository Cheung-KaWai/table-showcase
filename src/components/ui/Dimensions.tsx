import styled from "styled-components";
import { useTableStore } from "../../store/Tablestore";
import { MouseEvent, useState } from "react";
import { generateRange } from "@/lib/functions";
// import { generateRange } from "@/lib/functions";

export const Dimensions = () => {
  const length = useTableStore((state) => state.tableLength);
  const width = useTableStore((state) => state.tableWidth);
  const update = useTableStore((state) => state.update);
  const step = useTableStore((state) => state.step);
  const [expand, setexpand] = useState(false);

  const lengthOptions = generateRange([200, 300], 5);
  const widthOptions = generateRange([90, 120], 5);

  const handleLength = (e: MouseEvent<HTMLParagraphElement>, value: number) => {
    e.stopPropagation();
    update({ tableLengthPrevious: length, tableLength: value / 100 });
  };

  const handleWidth = (e: MouseEvent<HTMLParagraphElement>, value: number) => {
    e.stopPropagation();
    update({ tableWithPrevious: width, tableWidth: value / 100 });
  };

  return (
    <>
      <Container $show={step === 1} $expand={expand}>
        <MainContainer onMouseLeave={() => setexpand(false)} onMouseEnter={() => setexpand(true)} onClick={() => setexpand((prev) => !prev)}>
          <InnerContainer $expand={expand}>
            <OptionsContainer>
              <LengthOptionsContainer>
                {lengthOptions.map((x, i) => (
                  <DimensionOptionValue $active={x / 100 === length} key={i} onClick={(e) => handleLength(e, x)}>
                    {x}
                  </DimensionOptionValue>
                ))}
              </LengthOptionsContainer>
              <ArrowDown src="/arrowDown.svg" />
              <LengthOptionsContainer>
                {widthOptions.map((x, i) => (
                  <DimensionOptionValue $active={x / 100 === width} onClick={(e) => handleWidth(e, x)} key={i}>
                    {x}
                  </DimensionOptionValue>
                ))}
              </LengthOptionsContainer>
            </OptionsContainer>
            <CurrentValueContainer>
              <DimensionValue>{(length * 100).toFixed(0)}</DimensionValue>
              <DimensionValue>x</DimensionValue>
              <DimensionValue>{(width * 100).toFixed(0)}</DimensionValue>
            </CurrentValueContainer>
          </InnerContainer>
          <Circle $expand={expand}>
            <Icon src="/upDownArrow.svg" />
            <Icon src="/diagonalArrow.svg" />
          </Circle>
        </MainContainer>
      </Container>
    </>
  );
};

const OptionsContainer = styled.div`
  justify-content: space-between;
  display: flex;
  width: 100%;
`;

const LengthOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 80px;
  overflow: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 0 5px;
  gap: 2px;
`;

const Container = styled.div<{ $show: boolean; $expand: boolean }>`
  position: absolute;
  bottom: 3rem;
  left: 50%;

  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5em;
  transform: ${(props) => (props.$show ? "translateX(-50%) scale(1)" : "translateX(-50%) scale(0)")};
  transition: ${(props) => (props.$show ? "all 0.4s 0.3s cubic-bezier(.29,-0.6,.59,1.81)" : "all 0.3s 0.3s cubic-bezier(.29,-0.6,.77,.61)")};
`;

const MainContainer = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;
  align-self: self-start;
`;

const InnerContainer = styled.div<{ $expand: boolean }>`
  display: flex;
  gap: 0.7rem;
  position: relative;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0.5em 1em;
  height: 180px;
  width: 130px;
  overflow: hidden;
  backdrop-filter: blur(20px);
  max-height: ${(props) => (props.$expand ? "140px" : "42px")};
  border-radius: ${(props) => (props.$expand ? "12px" : "32px")};
  transition: all 0.6s ease-in-out;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.05);
`;

const ArrowDown = styled.img`
  width: 20px;
  height: auto;
  object-fit: contain;
`;

const Circle = styled.div<{ $expand: boolean }>`
  height: 42px;
  padding: 6px;
  aspect-ratio: 1;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.05);
  border-radius: ${(props) => (props.$expand ? "12px" : "50%")};
  background-color: #ffe4c9;
  transition: all 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  img {
    transform: translateY(${(props) => (props.$expand ? "-100%" : "0")});
  }
  align-self: flex-start;
  &:hover {
    img {
      transform: translateY(${(props) => (props.$expand ? "-195%" : "-100%")}) translateX(${(props) => (props.$expand ? "-5%" : "0")})
        rotate(${(props) => (props.$expand ? "0deg" : "90deg")});
    }
  }
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
  transition: all 0.3s cubic-bezier(0.02, -0.07, 0.18, 1.31);
`;

const CurrentValueContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  width: 100%;
`;

const DimensionValue = styled.p`
  font-weight: 300;
  font-size: 14px;
  line-height: 24px;
  flex: 1;
  flex-shrink: 0;
  text-align: center;
`;

const DimensionOptionValue = styled.p<{ $active: boolean }>`
  font-weight: 200;
  font-size: 14px;
  opacity: ${(props) => (props.$active ? 1 : 0.5)};
  transition: all ease-in-out 0.3s;

  &:hover {
    opacity: 1;
  }
`;
