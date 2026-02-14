import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import Game from "./pages/jogo/[id]";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/flag-game" element={<Home />} />
        <Route path="/flag-game/jogo/:id" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
