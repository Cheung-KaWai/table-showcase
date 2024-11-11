/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useTableStore } from "../../store/Tablestore";

export const Menu = () => {
  const [open, setOpen] = useState(false);
  const step = useTableStore((state) => state.step);
  const [currentStep, setcurrentStep] = useState(step);
  const [previousStep, setpreviousStep] = useState(step);

  const update = useTableStore((state) => state.update);

  useEffect(() => {
    setpreviousStep(currentStep);
    setcurrentStep(step);
  }, [step]);

  const handleMenu = (menuStep: number) => {
    update({ step: menuStep });
  };

  return (
    <Container onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <MenuContainer>
        <MenuHeaderContainer>
          <NumberContainer>
            <StepNumberFixed>0</StepNumberFixed>
            <StepNumber key={currentStep} $currentStep={currentStep}>
              {previousStep + 1}
            </StepNumber>
          </NumberContainer>
          <MenuTitle>Menu</MenuTitle>
          <MenuIconContainer className="icon" $open={open}>
            <MenuIcon />
            <MenuIcon />
          </MenuIconContainer>
        </MenuHeaderContainer>
        <MenuItemContainer $open={open}>
          <Dot $step={step} />
          <MenuItem $open={open} $selected={step === 0} onClick={() => handleMenu(0)} $step={"01"}>
            Shape
          </MenuItem>
          <MenuItem $open={open} $selected={step === 1} onClick={() => handleMenu(1)} $step={"02"}>
            Dimensions
          </MenuItem>
          <MenuItem $open={open} $selected={step === 2} onClick={() => handleMenu(2)} $step={"03"}>
            Finishing
          </MenuItem>
          <MenuItem $open={open} $selected={step === 3} onClick={() => handleMenu(3)} $step={"04"}>
            Table Material
          </MenuItem>
          <MenuItem $open={open} $selected={step === 4} onClick={() => handleMenu(4)} $step={"05"}>
            Leg Model
          </MenuItem>
          <MenuItem $open={open} $selected={step === 5} onClick={() => handleMenu(5)} $step={"06"}>
            Leg Material
          </MenuItem>
          <MenuItem $open={open} $selected={step === 6} onClick={() => handleMenu(6)} $step={"07"}>
            Overview
          </MenuItem>
        </MenuItemContainer>
      </MenuContainer>
    </Container>
  );
};

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(200%);
  }
`;

const MenuIconContainer = styled.div<{ $open: boolean }>`
  display: flex;
  gap: 1px;
  transition: all 0.6s cubic-bezier(0.02, -0.07, 0, 1.82);
  flex-direction: column;
  margin-left: 6px;
`;

const MenuIcon = styled.span`
  width: 4px;
  height: 4px;
  background-color: black;
  border-radius: 50%;
`;

const MenuHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 1rem;
  align-items: center;
  cursor: default;
`;

const NumberContainer = styled.div`
  overflow: hidden;
  height: 23px;
`;

const StepNumberFixed = styled.span`
  display: inline-block;
  text-transform: uppercase;
  font-size: 12px;
  position: relative;
  width: 2px;
  line-height: 20px;
`;

const StepNumber = styled.span<{ $currentStep: number }>`
  display: inline-block;
  text-transform: uppercase;
  font-size: 12px;
  position: relative;
  width: 20px;
  justify-content: center;
  text-align: center;
  line-height: 20px;
  transform: translateY(0); // Reset position initially
  animation: ${slideDown} 0.6s 0.3s cubic-bezier(0.02, -0.07, 0.18, 1.31) forwards;

  &::before {
    content: "${(props) => props.$currentStep + 1}";
    position: absolute;
    box-sizing: border-box;
    display: inline-block;
    top: 0px;
    transform: translateY(-200%);
    text-align: center;
    width: 20px;
    left: 0px;
  }
`;

const Dot = styled.span<{ $step: number }>`
  width: 8px;
  height: 8px;
  border: 1px solid;
  background-color: black;
  transition: all 0.3s cubic-bezier(0.02, -0.07, 0.18, 1.31);
  display: inline-block;
  border-radius: 50%;
  position: absolute;
  right: 1.5rem;
  margin: 5px;
  margin-right: 0;
  transform: translateY(${(props) => props.$step * 33.5}px);
`;

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 3rem;
  padding-right: 3rem;
  &:hover {
    div {
      div {
        max-height: 500px;
        opacity: 1;
        transform: rotate(0deg);
        p {
          transform: translateX(0);
        }

        .icon {
          transform: rotate(90deg);
        }
      }
    }
  }
`;

const MenuContainer = styled.div`
  cursor: pointer;
`;

const MenuItemContainer = styled.div<{ $open: boolean }>`
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  transition: ${(props) => (props.$open ? "all 0.3s 0.3s ease-in-out;" : "all 0.3s ease-in-out;")};
  border-radius: 12px;
  gap: 1em;
  max-height: 0;
  padding: 2em;
  overflow: hidden;
  opacity: 0;
  transform: rotate(-5deg);
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const MenuTitle = styled.p`
  text-align: right;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 20px;
  display: inline-block;
`;

const MenuItem = styled.p<{ $open: boolean; $selected: boolean; $step: string }>`
  font-weight: 200;
  font-family: "REM", serif;
  font-size: 14px;
  opacity: ${(props) => (props.$selected ? 1 : 0.3)};
  transform: translateX(0px);
  transition: ${(props) => (props.$open ? "all 0.3s ease-in-out;" : "all 0.3s 0.3s ease-in-out;")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  position: relative;
  padding-left: 1.2rem;

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    background-color: ${(props) => (props.$selected ? "transparent" : "transparent")};
    transition: ${(props) => (props.$open ? "all 0.3s ease-in-out;" : "all 0.3s 0.3s ease-in-out;")};
    display: inline-block;
    border-radius: 50%;
  }

  &::before {
    content: "${(props) => props.$step}";
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    font-size: 8px;
  }

  &:hover {
    opacity: 1 !important;
  }
`;
