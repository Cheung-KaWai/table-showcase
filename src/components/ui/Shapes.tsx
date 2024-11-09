import { listShapes } from "@/data/data";
import styled from "styled-components";
import { useTableStore } from "../../store/Tablestore";

export const Shapes = () => {
  const update = useTableStore((state) => state.update);
  const tableShape = useTableStore((state) => state.tableShape);
  const step = useTableStore((state) => state.step);
  const show = step === 0;
  return (
    <Menu $show={show}>
      {listShapes.map((x, index) => (
        <MenuItem
          $active={tableShape === x}
          onMouseEnter={() => {
            const oldIndex = listShapes.indexOf(tableShape);
            update({ tableShape: x, animationspeed: Math.abs(oldIndex - index) });
          }}
          key={index}
        >
          {x}
        </MenuItem>
      ))}
    </Menu>
  );
};

const Menu = styled.div<{ $show: boolean }>`
  position: absolute;
  left: 0;
  top: 50%;
  pointer-events: ${(props) => (props.$show ? "default" : "none")};
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transform-origin: center center;
  transform: ${(props) => (props.$show ? "translateY(-50%) translateX(0%)" : "translateY(-50%)  translateX(-5%)")};
  transition: ${(props) => (props.$show ? "all 0.3s 0.6s ease-in-out" : "all 0.3s ease-in-out")};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 3rem;
`;

const MenuItem = styled.p<{ $active: boolean }>`
  color: black;
  font-weight: 300;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 1px;
  opacity: ${(props) => (props.$active ? 1 : 0.5)};
  transition: all ease-in-out 0.3s;
  position: relative;
  display: flex;
  align-items: center;
  gap: 3px;

  &::before {
    transition: all ease-in-out 0.3s;
    content: "";
    position: relative;
    display: inline-block;
    width: ${(props) => (props.$active ? "16px" : 0)};
    height: 2px;
    border-radius: 5px;
    background-color: black;
  }
  &:hover {
    cursor: pointer;
    opacity: 1;
    &::before {
      width: 16px;
    }
  }
`;
