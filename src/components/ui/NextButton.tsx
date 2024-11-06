import { useState } from "react";
import styled from "styled-components";
import { useTableStore } from "../../store/Tablestore";
import { menu } from "@/data/data";

export const NextButton = () => {
  const [disable, setDisable] = useState(false);
  const step = useTableStore((state) => state.step);
  const update = useTableStore((state) => state.update);

  const handleClick = () => {
    setDisable(true);

    setTimeout(() => {
      update({ step: step + 1 });
    }, 300);
    setTimeout(() => {
      setDisable(false);
    }, 1000);
  };

  return (
    <Container key={1} $disable={disable} onClick={handleClick}>
      <TextContainer $text={menu[step + 1] ?? ""}>
        <Arrow className="arrowTop" />
        <Arrow2 className="arrowBottom" />
        <Text>Next Step</Text>
      </TextContainer>
    </Container>
  );
};
const Container = styled.div<{ $disable: boolean }>`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 3rem;
  &:hover {
    div {
      pointer-events: ${(props) => (props.$disable ? "none" : "auto")};
      &::before {
        width: ${(props) => (props.$disable ? "8" : "16px")};
        height: ${(props) => (props.$disable ? "8" : "0px")};
        border-radius: ${(props) => (props.$disable ? "50%" : "10px")};
      }

      &::after {
        max-width: ${(props) => (props.$disable ? 0 : " 150px")};
        margin-left: ${(props) => (props.$disable ? "0" : "5px")};
      }

      .arrowTop {
        transition: transform 0.2s 0.55s cubic-bezier(0.02, -0.07, 0, 1.82);
        transform: rotate(30deg);
        opacity: ${(props) => (props.$disable ? 0 : 1)};
        transform: ${(props) => (props.$disable ? "rotate(0deg)" : "rotate(30deg)")};
      }

      .arrowBottom {
        transition: transform 0.2s 0.55s cubic-bezier(0.02, -0.07, 0, 1.82);
        transform: ${(props) => (props.$disable ? "rotate(0deg)" : "rotate(-30deg)")};
        opacity: ${(props) => (props.$disable ? 0 : 1)};
      }
    }
  }
`;

const Arrow = styled.span`
  width: 8px;
  height: 2px;
  background-color: black;
  position: absolute;
  transform-origin: center right;
  border-radius: 10px;
  margin-left: 7px;
  opacity: 0;
  margin-right: 5px;
`;

const Arrow2 = styled.span`
  width: 8px;
  height: 2px;
  background-color: black;
  position: absolute;
  transform-origin: center right;
  border-radius: 10px;
  margin-left: 7px;
  opacity: 0;
  margin-right: 5px;
`;

const TextContainer = styled.div<{ $text: string }>`
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 0px;
  letter-spacing: 1px;

  padding-top: 2rem;

  &::before {
    content: "";
    transition: all 0.6s cubic-bezier(0.02, -0.07, 0, 1.82);
    box-sizing: border-box;
    display: inline-block;
    width: 8px;
    height: 8px;
    border: 1px solid;
    border-radius: 50%;
    margin-right: 5px;
  }

  &::after {
    content: "${(props) => props.$text}";
    display: inline-block;
    box-sizing: border-box;
    font-size: 12px;
    text-transform: uppercase;
    max-width: 0;
    font-weight: 400;
    white-space: nowrap;
    transition: all 0.3s;
  }
`;
const Text = styled.p`
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 300;
`;
