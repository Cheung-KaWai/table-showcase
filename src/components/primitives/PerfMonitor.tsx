import { Perf } from "r3f-perf";
import { useTableStore } from "../../store/Tablestore";

export const PerfMonitor = () => {
  const showPerf = useTableStore((state) => state.showPerf);
  return <>{showPerf && <Perf position="top-left" />}</>;
};
