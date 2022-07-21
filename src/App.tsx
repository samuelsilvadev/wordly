import { Routes, Route } from "react-router-dom";
import Orchestrator from "components/orchestrator/Orchestrator";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Orchestrator />} />
    </Routes>
  );
}

export default App;
