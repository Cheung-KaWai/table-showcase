import { Container } from "./primitives/Container";
import { LevaDebug } from "./primitives/LevaDebug";
import { Scene } from "./three/Scene";
import { Menu } from "./ui/Menu";
import { NextButton } from "./ui/NextButton";
import { Shapes } from "./ui/Shapes";

function App() {
  return (
    <Container>
      <Scene />
      <Shapes />
      <NextButton />
      <Menu />
      <LevaDebug />
    </Container>
  );
}

export default App;
