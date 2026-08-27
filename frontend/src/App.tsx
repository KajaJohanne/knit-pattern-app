import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NewPatternPage } from "./pages/NewPatternPage";
import { EditorPage } from "./pages/EditorPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<NewPatternPage />} />
          <Route path="/pattern/:id" element={<EditorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
