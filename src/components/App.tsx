import { Container } from "./primitives/Container";
import { LevaDebug } from "./primitives/LevaDebug";
import { Scene } from "./three/Scene";

function App() {
  return (
    <Container>
      <Scene />
      <LevaDebug />
    </Container>
  );
}

export default App;
