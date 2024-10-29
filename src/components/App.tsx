import { Container } from "./primitives/Container";
import { LevaDebug } from "./primitives/LevaDebug";
import { Scene } from "./three/Scene";
import { NextButton } from "./ui/NextButton";
import { Shapes } from "./ui/Shapes";

function App() {
  return (
    <Container>
      <Scene />
      <Shapes />
      <NextButton />
      <LevaDebug />
    </Container>
  );
}

export default App;
