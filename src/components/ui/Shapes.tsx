import { listShapes } from "@/data/data";
import styled from "styled-components";
import { useTableStore } from "../../store/Tablestore";

export const Shapes = () => {
  const update = useTableStore((state) => state.update);
  const tableShape = useTableStore((state) => state.tableShape);
  return (
    <Menu>
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

const Menu = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
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
  opacity: ${(props) => (props.$active ? 1 : 0.3)};
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
