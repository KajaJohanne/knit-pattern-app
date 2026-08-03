import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NewPatternPage } from "./pages/NewPatternPage";
import { EditorPage } from "./pages/EditorPage";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/new">Nytt mønster</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewPatternPage />} />
        <Route path="/pattern/:id" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
