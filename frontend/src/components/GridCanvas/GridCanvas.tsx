import { useEffect, useRef, useState } from "react";
import type { Cell, KnittingMode } from "../../types/pattern";

import { ColorPicker } from "../ColorPicker/ColorPicker";
import { savePattern, updatePatternById } from "../../api/patterns";
import { Button } from "../Button";
import { toast } from "sonner";
import { ChartDescriptions } from "../ChartDescriptions";

type GridCanvasProps = {
  rows: number;
  columns: number;
  name: string;
  knittingMode: KnittingMode;
  initialGrid?: Cell[][];
  initialKnittedRows?: boolean[];
  initialThumbGrid?: Cell[][];
  initialThumbKnittedRows?: boolean[];
  patternId?: number; // Hvis denne finnes så redigeres eksisterende mønster
};

export function GridCanvas({
  rows,
  columns,
  name,
  knittingMode,
  initialGrid,
  initialKnittedRows,
  initialThumbGrid,
  initialThumbKnittedRows,
  patternId,
}: GridCanvasProps) {
  const [grid, setGrid] = useState<Cell[][]>(
    () => initialGrid ?? createEmptyGrid(rows, columns),
  );

  const [knittedRows, setKnittedRows] = useState<boolean[]>(
    () => initialKnittedRows ?? Array(rows).fill(false),
  );

  const [thumbGrid, setThumbGrid] = useState<Cell[][] | null>(
    () => initialThumbGrid ?? null,
  );

  const [thumbKnittedRows, setThumbKnittedRows] = useState<boolean[]>(
    () =>
      initialThumbKnittedRows ??
      (initialThumbGrid ? Array(initialThumbGrid.length).fill(false) : []),
  );

  const [selectedColor, setSelectedColor] = useState("#ff6b6b");
  const [isSaving, setIsSaving] = useState(false);

  const [isEditable, setIsEditable] = useState(patternId === undefined);

  const [isDrawing, setIsDrawing] = useState(false);
  //const [tool, setTool] = useState("pen");
  //const [history, setHistory] = useState([]);
  //const [historyIndex, setHistoryIndex] = useState(-1);
  //const canvasRef = useRef(null);

  function createEmptyGrid(rows: number, columns: number): Cell[][] {
    return Array(rows)
      .fill(null)
      .map(() =>
        Array(columns)
          .fill(null)
          .map(() => ({ color: "#fffdf9" })),
      );
  }

  /*
  function handleClearGrid() {
    const clearedGrid = grid.map((row) =>
      row.map((cell) => {
        if (cell.blocked) {
          return cell; //behold faste celler
        }
        return { color: "#fffdf9", blocked: false };
      }),
    );
    setGrid(clearedGrid);

    if (thumbGrid !== null) {
      const clearedThumbGrid = thumbGrid.map((row) =>
        row.map((cell) => {
          if (cell.blocked) {
            return cell;
          }
          return { color: "#fffdf9", blocked: false };
        }),
      );
      setThumbGrid(clearedThumbGrid);
    }
  }*/

  function clearNonBlockedCells(sourceGrid: Cell[][]): Cell[][] {
    return sourceGrid.map((row) =>
      row.map((cell) => {
        if (cell.blocked) {
          return cell;
        }
        return { color: "#fffdf9", blocked: false };
      }),
    );
  }

  function handleClearGrid() {
    setGrid(clearNonBlockedCells(grid));
    if (thumbGrid !== null) {
      setThumbGrid(clearNonBlockedCells(thumbGrid));
    }
  }

  /*
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
    */

  function handleMouseDownIn(
    targetGrid: Cell[][],
    setTargetGrid: (grid: Cell[][]) => void,
    rowIndex: number,
    colIndex: number,
  ) {
    if (!isEditable) return;

    setIsDrawing(true);
    paintCellIn(targetGrid, setTargetGrid, rowIndex, colIndex);
  }

  function handleMouseEnterIn(
    targetGrid: Cell[][],
    setTargetGrid: (grid: Cell[][]) => void,
    rowIndex: number,
    colIndex: number,
  ) {
    if (!isEditable || !isDrawing) return;

    paintCellIn(targetGrid, setTargetGrid, rowIndex, colIndex);
  }

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  function paintCellIn(
    targetGrid: Cell[][],
    setTargetGrid: (grid: Cell[][]) => void,
    clickedRowIndex: number,
    clickedColIndex: number,
  ) {
    const newGrid = targetGrid.map((currentRow, rowIndex) => {
      if (rowIndex !== clickedRowIndex) return currentRow;
      return currentRow.map((currentCell, colIndex) => {
        if (colIndex !== clickedColIndex) return currentCell;
        if (currentCell.blocked) return currentCell;
        return { color: selectedColor };
      });
    });
    setTargetGrid(newGrid);
  }

  async function handleSave() {
    setIsSaving(true);

    /*
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
      }*/

    try {
      const patternData = {
        name,
        rows,
        columns,
        grid,
        knittedRows,
        knittingMode,
        thumbGrid: thumbGrid ?? undefined,
        thumbKnittedRows: thumbGrid ? thumbKnittedRows : undefined,
      };
      if (patternId !== undefined) {
        await updatePatternById(patternId, patternData);
      } else {
        await savePattern(patternData);
      }

      toast.success("Mønsteret er lagret!");
      setIsEditable(false);
    } catch (error) {
      toast.error("Noe gikk galt under lagring");
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

  function toggleThumbRowKnitted(rowIndex: number) {
    if (thumbGrid === null) return;

    const newThumbKnittedRows = thumbKnittedRows.map((isKnitted, index) =>
      index === rowIndex ? !isKnitted : isKnitted,
    );
    setThumbKnittedRows(newThumbKnittedRows);

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
        knittedRows,
        knittingMode,
        thumbGrid,
        thumbKnittedRows: newThumbKnittedRows,
      });
    }, 1000);
  }

  return (
    <div
      className="flex flex-col gap-6 items-center w-full"
      onMouseUp={handleMouseUp}
    >
      <div className="flex flex-wrap gap-3">
        {isEditable && (
          <Button variant="secondary" onClick={handleClearGrid}>
            Tøm rutenett
          </Button>
        )}
        {isEditable && (
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Lagrer.." : "Lagre mønster"}
          </Button>
        )}
        {!isEditable && (
          <Button variant="secondary" onClick={() => setIsEditable(true)}>
            Rediger mønster
          </Button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-center w-full">
        {/* Hoveddel */}
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
                    className={`grid gap-px ${knittedRows[rowIndex] ? "opacity-35" : ""}`}
                    style={{
                      gridTemplateColumns: `repeat(${columns}, 1fr)`,
                      width: `${Math.min(columns * 12, 800)}px`,
                    }}
                  >
                    {row.map((cell, colIndex) => (
                      <div
                        key={colIndex}
                        className="aspect-square cursor-pointer border border-charcoal/30 "
                        style={{ background: cell.color }}
                        //onClick={() => handleCellClick(rowIndex, colIndex)}
                        onMouseDown={() =>
                          handleMouseDownIn(grid, setGrid, rowIndex, colIndex)
                        }
                        onMouseEnter={() =>
                          handleMouseEnterIn(grid, setGrid, rowIndex, colIndex)
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tommel */}
        {thumbGrid !== null && (
          <div className="flex flex-col justify-between">
            <ChartDescriptions />

            <div className="flex flex-col lg:flex-row gap-4 bg-background-blue/30 p-3 rounded-lg w-fit mx-auto">
              <div className="flex-1 overflow-x-auto">
                <div className="flex flex-col">
                  <h3 className="font-heading font-bold text-sm text-charcoal uppercase mb-3 text-center">
                    Tommel
                  </h3>
                  {thumbGrid.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="flex items-center cursor-pointer"
                      onClick={() =>
                        !isEditable && toggleThumbRowKnitted(rowIndex)
                      }
                    >
                      <div
                        className={`grid gap-px ${thumbKnittedRows[rowIndex] ? "opacity-35" : ""}`}
                        style={{
                          gridTemplateColumns: `repeat(${thumbGrid[0].length}, 1fr)`,
                          width: `${Math.min(thumbGrid[0].length * 12, 400)}px`,
                        }}
                      >
                        {row.map((cell, colIndex) => (
                          <div
                            key={colIndex}
                            className={`aspect-square cursor-pointer border border-charcoal/30`}
                            style={{ background: cell.color }}
                            onMouseDown={() =>
                              thumbGrid &&
                              handleMouseDownIn(
                                thumbGrid,
                                setThumbGrid,
                                rowIndex,
                                colIndex,
                              )
                            }
                            onMouseEnter={() =>
                              thumbGrid &&
                              handleMouseEnterIn(
                                thumbGrid,
                                setThumbGrid,
                                rowIndex,
                                colIndex,
                              )
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
