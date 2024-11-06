import { Container } from "./primitives/Container";
import { LevaDebug } from "./primitives/LevaDebug";
import { Scene } from "./three/Scene";
import { Menu } from "./ui/Menu";
import { NextButton } from "./ui/NextButton";
import { Progress } from "./ui/Progress";
import { Shapes } from "./ui/Shapes";

function App() {
  return (
    <Container>
      <Scene />
      <Shapes />
      <NextButton />
      <Menu />
      <Progress />
      <LevaDebug />
    </Container>
  );
}

export default App;
