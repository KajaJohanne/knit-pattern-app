import { useRef, useState } from "react";
import type { Cell, KnittingMode } from "../../types/pattern";

import { ColorPicker } from "../ColorPicker/ColorPicker";
import { savePattern, updatePatternById } from "../../api/patterns";
import { Button } from "../Button";

type GridCanvasProps = {
  rows: number;
  columns: number;
  name: string;
  knittingMode: KnittingMode;
  initialGrid?: Cell[][];
  initialKnittedRows?: boolean[];
  patternId?: number; // Hvis denne finnes så redigeres eksisterende mønster
};

export function GridCanvas({
  rows,
  columns,
  name,
  knittingMode,
  initialGrid,
  initialKnittedRows,
  patternId,
}: GridCanvasProps) {
  const [grid, setGrid] = useState<Cell[][]>(
    () => initialGrid ?? createEmptyGrid(rows, columns),
  );

  const [knittedRows, setKnittedRows] = useState<boolean[]>(
    () => initialKnittedRows ?? Array(rows).fill(false),
  );

  const [selectedColor, setSelectedColor] = useState("#ff6b6b");
  const [isSaving, setIsSaving] = useState(false);

  const [isEditable, setIsEditable] = useState(patternId === undefined);

  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pen");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const canvasRef = useRef(null);

  function createEmptyGrid(rows: number, columns: number): Cell[][] {
    return Array(rows)
      .fill(null)
      .map(() =>
        Array(columns)
          .fill(null)
          .map(() => ({ color: "#fffdf9" })),
      );
  }

  function handleClearGrid() {
    setGrid(createEmptyGrid(rows, columns));
  }

  function handleCellClick(clickedRowIndex: number, clickecColIndex: number) {
    if (!isEditable) {
      return;
    }

    const newGrid = grid.map((currentRow, rowIndex) => {
      if (rowIndex !== clickedRowIndex) {
        return currentRow;
      }

      return currentRow.map((currentCell, colIndex) => {
        if (colIndex !== clickecColIndex) {
          return currentCell;
        }

        const isAlreadyCelectedColor = currentCell.color === selectedColor;
        const newColor = isAlreadyCelectedColor ? "#fffdf9" : selectedColor;

        return { color: newColor };
      });
    });

    setGrid(newGrid);
  }

  async function handleSave() {
    setIsSaving(true);

    try {
      if (patternId !== undefined) {
        await updatePatternById(patternId, {
          name,
          rows,
          columns,
          grid,
          knittedRows: Array(rows).fill(false),
          knittingMode,
        });
      } else {
        await savePattern({
          name,
          rows,
          columns,
          grid,
          knittedRows: Array(rows).fill(false),
          knittingMode,
        });
      }
      alert("Yay! Mønsteret er lagret:)");
      setIsEditable(false);
    } catch (error) {
      alert("Oida, noe gikk galt under lagring");
    } finally {
      setIsSaving(false);
    }
  }

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function toggleRowKnitted(rowIndex: number) {
    const newKnittedRows = knittedRows.map((isKnitted, index) =>
      index === rowIndex ? !isKnitted : isKnitted,
    );
    setKnittedRows(newKnittedRows);

    if (patternId === undefined) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      updatePatternById(patternId, {
        name,
        rows,
        columns,
        grid,
        knittedRows: newKnittedRows,
        knittingMode,
      });
    }, 1000);
  }

  return (
    <div className="flex flex-col gap-6  mx-auto">
      <div className="flex flex-wrap gap-3">
        {isEditable && (
          <Button variant="secondary" onClick={handleClearGrid}>
            Tøm rutenett
          </Button>
        )}
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Lagrer.." : "Lagre mønster"}
        </Button>
        {!isEditable && (
          <Button variant="secondary" onClick={() => setIsEditable(true)}>
            Rediger mønster
          </Button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 bg-background-blue/30 p-3 rounded-lg ">
        {isEditable && (
          <div className="lg:w-32 flex-shrink-0">
            <ColorPicker
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
            />
          </div>
        )}

        <div className="flex-1 overflow-x-auto">
          <div className="flex flex-col">
            {grid.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex items-center cursor-pointer"
                onClick={() => !isEditable && toggleRowKnitted(rowIndex)}
              >
                <div
                  className={`grid gap-px flex-1 max-w-[500px] ${knittedRows[rowIndex] ? "opacity-35" : ""}`}
                  style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
                >
                  {row.map((cell, colIndex) => (
                    <div
                      key={colIndex}
                      className="aspect-square cursor-pointer border border-charcoal/30 "
                      style={{ background: cell.color }}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
