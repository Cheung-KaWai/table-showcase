import styled from "styled-components";
import { useTableStore } from "../../store/Tablestore";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export const Progress = () => {
  const step = useTableStore((state) => state.step);

  return (
    <>
      <ProgressBarBackground />
      <ProgressBar $step={step + 1} />
      <AnimatedNumber value={(100 / 7) * (step + 1)} />
    </>
  );
};

const ProgressBar = styled.div<{ $step: number }>`
  width: 2px;
  height: 64px;
  border-radius: 10px;
  background-color: black;
  position: absolute;
  right: 3.2rem;
  bottom: 5rem;
  transform: scaleY(${(props) => (1 / 7) * props.$step});
  transform-origin: center bottom;
  transition: all 0.3s ease-in-out;
`;

const ProgressBarBackground = styled.div`
  width: 2px;
  height: 64px;
  background-color: #ffe4c9;
  border-radius: 10px;
  position: absolute;
  right: 3.2rem;
  bottom: 5rem;
`;

function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(value, { mass: 0.01, stiffness: 20, damping: 2 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <StyledNumber>{display}</StyledNumber>;
}
const StyledNumber = styled(motion.p)`
  position: absolute;
  right: 2.7rem;
  bottom: 9.5rem;
  transform-origin: top;
  transform: rotate(-90deg);
  font-size: 10px;
  white-space: nowrap;
  width: 2rem;
`;
