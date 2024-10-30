import { useState } from "react";
import styled from "styled-components";
import { useTableStore } from "../../store/Tablestore";

export const Menu = () => {
  const [open, setOpen] = useState(false);
  const step = useTableStore((state) => state.step);
  const update = useTableStore((state) => state.update);

  const handleMenu = (menuStep: number) => {
    update({ step: menuStep });
  };

  return (
    <Container onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <MenuContainer>
        <MenuTitle>
          <span>{step + 1}</span> Menu
        </MenuTitle>
        <MenuItemContainer $open={open}>
          <MenuItem $open={open} $selected={step === 0} onClick={() => handleMenu(0)}>
            Shape
          </MenuItem>
          <MenuItem $open={open} $selected={step === 1} onClick={() => handleMenu(1)}>
            Dimensions
          </MenuItem>
          <MenuItem $open={open} $selected={step === 2} onClick={() => handleMenu(2)}>
            Finishing
          </MenuItem>
          <MenuItem $open={open} $selected={step === 3} onClick={() => handleMenu(3)}>
            Table Material
          </MenuItem>
          <MenuItem $open={open} $selected={step === 4} onClick={() => handleMenu(4)}>
            Leg
          </MenuItem>
          <MenuItem $open={open} $selected={step === 5} onClick={() => handleMenu(5)}>
            Leg Material
          </MenuItem>
          <MenuItem $open={open} $selected={step === 6} onClick={() => handleMenu(6)}>
            Overview
          </MenuItem>
        </MenuItemContainer>
      </MenuContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 3rem;
  &:hover {
    div {
      div {
        padding: 1.5rem;
        max-height: 500px;
        opacity: 1;
        transform: rotate(0deg);
        p {
          transform: translateX(0);
        }
      }
    }
  }
`;

const MenuContainer = styled.div`
  cursor: pointer;
`;

const MenuItemContainer = styled.div<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  transition: ${(props) => (props.$open ? "all 0.3s 0.3s ease-in-out;" : "all 0.3s ease-in-out;")};
  border-radius: 10px;
  gap: 1em;
  max-height: 0;
  padding: 0;
  overflow: hidden;
  opacity: 0;
  transform: rotate(-5deg);
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.05);
`;

const MenuTitle = styled.p`
  text-align: right;
  text-transform: uppercase;
  font-size: 12px;
  padding-bottom: 1rem;
`;

const MenuItem = styled.p<{ $open: boolean; $selected: boolean }>`
  font-weight: 100;
  font-family: "REM", serif;
  font-size: 16px;
  opacity: ${(props) => (props.$selected ? 1 : 0.3)};
  transform: translateX(0px);
  transition: ${(props) => (props.$open ? "all 0.3s ease-in-out;" : "all 0.3s 0.3s ease-in-out;")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    background-color: ${(props) => (props.$selected ? "black" : "transparent")};
    transition: ${(props) => (props.$open ? "all 0.3s ease-in-out;" : "all 0.3s 0.3s ease-in-out;")};
    display: inline-block;
    border-radius: 50%;
  }

  &:hover {
    opacity: 1 !important;
  }
`;
