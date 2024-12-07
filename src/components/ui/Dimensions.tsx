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
        <MainContainer onMouseLeave={() => setexpand(false)} onMouseEnter={() => setexpand(true)}>
          <InnerContainer $expand={expand}>
            <OptionsContainer>
              <LengthOptionsContainer>
                {lengthOptions.map((x, i) => (
                  <DimensionOptionValue $active={x / 100 === length} key={i} onClick={(e) => handleLength(e, x)}>
                    {x}
                  </DimensionOptionValue>
                ))}
              </LengthOptionsContainer>
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
  left: 3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5em;
  transform: ${(props) => (props.$show ? "scale(1)" : "scale(0)")};
  transition: ${(props) => (props.$show ? "all 0.3s 0.3s cubic-bezier(.29,-0.6,.59,1.81)" : "all 0.3s 0.3s cubic-bezier(.29,-0.6,.77,.61)")};
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
  padding: 1em 1em 0.5em 1em;
  width: 130px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border-radius: ${(props) => (props.$expand ? "8px" : "8px")};
  max-height: ${(props) => (props.$expand ? "500px" : "44px")};
  transition: max-height 0.6s ease-in-out;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.05);
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
  line-height: 26px;
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
