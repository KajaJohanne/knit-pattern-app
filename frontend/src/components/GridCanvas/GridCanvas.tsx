import { useRef, useState } from "react";
import type { Cell } from "../../types/pattern";
import "./GridCanvas.css";

type GridCanvasProps = {
  rows: number;
  columns: number;
};

export function GridCanvas({ rows, columns }: GridCanvasProps) {
  const [grid, setGrid] = useState<Cell[][]>(() =>
    createEmptyGrid(rows, columns),
  );

  const [selectedColor, setSelectedColor] = useState("#ff6b6b");
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pen");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const canvasRef = useRef(null);

  const colors = [
    "#ff6b6b",
    "#ffd93d",
    "#6bcb77",
    "#4d96ff",
    "#ff6bff",
    "#ff9f43",
    "#00d2d3",
    "#f368e0",
    "#54a0ff",
    "#5f27cd",
    "#ff4757",
    "#2ed573",
    "#1e90ff",
    "#ff6348",
    "#a29bfe",
    "#ffffff",
    "#2d3436",
    "#fd79a8",
    "#00b894",
    "#0984e3",
  ];

  function createEmptyGrid(rows: number, columns: number): Cell[][] {
    return Array(rows)
      .fill(null)
      .map(() =>
        Array(columns)
          .fill(null)
          .map(() => ({ color: "#1a1a2e" })),
      );
  }

  function handleClearGrid() {
    setGrid(createEmptyGrid(rows, columns));
  }

  function handleCellClick(clickedRowIndex: number, clickecColIndex: number) {
    const newGrid = grid.map((currentRow, rowIndex) => {
      if (rowIndex !== clickedRowIndex) {
        return currentRow;
      }

      return currentRow.map((currentCell, colIndex) => {
        if (colIndex !== clickecColIndex) {
          return currentCell;
        }

        return { color: selectedColor };
      });
    });

    setGrid(newGrid);
  }

  return (
    <div>
      <p>Tegn i vei!</p>

      <button onClick={handleClearGrid}>Slett innhold</button>

      <div className="pixelCanvas">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="pixelRow">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="pixelCell"
                style={{ background: cell.color }}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
