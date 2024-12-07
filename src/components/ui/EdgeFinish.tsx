import { useState } from "react";
import { useTableStore } from "../../store/Tablestore";
import styled from "styled-components";
import { listEdges } from "@/data/data";

export const EdgeFinish = () => {
  // const edge = useTableStore((state) => state.currentEdge);
  const step = useTableStore((state) => state.step);
  const edge = useTableStore((state) => state.currentEdge);
  const update = useTableStore((state) => state.update);
  const show = step === 2;
  const [expand, setexpand] = useState(false);
  const currentEdge = listEdges.find((x) => x.id === edge)!;
  return (
    <>
      <Menu $show={show} $expand={expand} onMouseLeave={() => setexpand(false)} onMouseEnter={() => setexpand(true)}>
        <MenuInnercontainer $expand={expand}>
          {listEdges.map((x, index) => (
            <MenuItemContainer>
              <MenutItemImage src={x.path} />
              <MenuItem
                $active={edge === x.id}
                onClick={() => {
                  update({ currentEdge: x.id, previousEdge: edge });
                }}
                key={index}
              >
                {x.name}
              </MenuItem>
            </MenuItemContainer>
          ))}
        </MenuInnercontainer>
        <MenuItemContainer>
          <MenutItemImage src={currentEdge.path} />
          <MenuItem $active={currentEdge.id === edge}>{currentEdge?.name}</MenuItem>
        </MenuItemContainer>
      </Menu>
    </>
  );
};

const Menu = styled.div<{ $show: boolean; $expand: boolean }>`
  position: absolute;
  left: 3rem;
  bottom: 3rem;
  pointer-events: ${(props) => (props.$show ? "default" : "none")};
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transform: ${(props) => (props.$show ? "translateX(0%) scale(1)" : "translateX(0%) scale(0)")};
  transition: ${(props) => (props.$show ? "all 0.3s 0.3s cubic-bezier(.29,-0.6,.59,1.81)" : "all 0.3s 0.3s cubic-bezier(.29,-0.6,.77,.61)")};
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border-radius: ${(props) => (props.$expand ? "8px" : "8px")};
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.05);
  /* max-height: ${(props) => (props.$expand ? "140px" : "42px")}; */
  overflow: hidden;
`;

const MenuInnercontainer = styled.div<{ $expand: boolean }>`
  overflow: scroll;
  max-height: ${(props) => (props.$expand ? "500px" : "0px")};
  transition: max-height 0.6s ease-in-out;
`;

const MenuItemContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  backdrop-filter: blur(10px);
  padding: 0.625em 1em;
`;

const MenutItemImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const MenuItem = styled.p<{ $active: boolean }>`
  color: black;
  font-weight: 300;
  font-size: 14px;
  opacity: ${(props) => (props.$active ? 1 : 0.5)};
  transition: all ease-in-out 0.3s;
  position: relative;
  display: flex;
  align-items: center;
  gap: 3px;

  /* &::before {
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
  } */
`;
