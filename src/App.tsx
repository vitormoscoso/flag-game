import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import Game from "./pages/jogo/[id]";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jogo/:id" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;