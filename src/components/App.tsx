import { Container } from "./primitives/Container";
import { LevaDebug } from "./primitives/LevaDebug";
import { Scene } from "./three/Scene";
import { Dimensions } from "./ui/Dimensions";
import { EdgeFinish } from "./ui/EdgeFinish";
import { Menu } from "./ui/Menu";
import { NextButton } from "./ui/NextButton";
import { Progress } from "./ui/Progress";
import { Shapes } from "./ui/Shapes";

function App() {
  return (
    <Container>
      <Scene />
      <Shapes />
      <Dimensions />
      <NextButton />
      <Menu />
      <Progress />
      <LevaDebug />
      <EdgeFinish />
    </Container>
  );
}

export default App;
