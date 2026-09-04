import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { NewPatternPage } from "./pages/NewPatternPage";
import { EditorPage } from "./pages/EditorPage";
import { Toaster } from "sonner";

import {
  generateMittenSmallGrid,
  generateMittenSmallThumbGrid,
} from "./templates/mittenSmall";

function TemplateTest() {
  const mittenGrid = generateMittenSmallGrid();
  const thumbGrid = generateMittenSmallThumbGrid();

  return (
    <div
      style={{
        padding: 20,
        display: "flex",
        gap: 40,
        alignItems: "flex-start",
      }}
    >
      <div>
        <h3>Vott</h3>
        {mittenGrid.map((row, i) => (
          <div key={i} style={{ display: "flex" }}>
            {row.map((cell, j) => (
              <div
                key={j}
                style={{
                  width: 8,
                  height: 8,
                  background: cell.color,
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div>
        <h3>Tommel</h3>
        {thumbGrid.map((row, i) => (
          <div key={i} style={{ display: "flex" }}>
            {row.map((cell, j) => (
              <div
                key={j}
                style={{
                  width: 8,
                  height: 8,
                  background: cell.color,
                  border: "1px solid #ccc",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<NewPatternPage />} />
          <Route path="/pattern/:id" element={<EditorPage />} />
          <Route path="/test" element={<TemplateTest />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
