import { useState, type FormEvent } from "react";
import { GridCanvas } from "../components/GridCanvas/GridCanvas";
import type { KnittingMode } from "../types/pattern";
import { ColorPicker } from "../components/ColorPicker/ColorPicker";

export function NewPatternPage() {
  const [name, setName] = useState("");
  const [rows, setRows] = useState(1);
  const [columns, setColums] = useState(1);
  const [knittingMode, setKnittingMode] = useState<KnittingMode>("flat");

  const [patternConfig, setPatternConfig] = useState<{
    name: string;
    rows: number;
    columns: number;
    knittingMode: KnittingMode;
  } | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setPatternConfig({ name, rows, columns, knittingMode });
  }

  if (patternConfig === null) {
    return (
      <div>
        <h1>Nytt mønster</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Navn</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="rows">Antall rader</label>
            <input
              id="rows"
              type="number"
              min={1}
              max={200}
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
            />
          </div>

          <div>
            <label htmlFor="colums">Antall kolonner</label>
            <input
              id="columns"
              type="number"
              min={1}
              max={200}
              value={columns}
              onChange={(e) => setColums(Number(e.target.value))}
            />
          </div>

          <div>
            <label htmlFor="mode">Frem og tilbake eller rundstrikk?</label>
            <select
              id="mode"
              value={knittingMode}
              onChange={(e) => setKnittingMode(e.target.value as KnittingMode)}
            >
              <option value="flat">Frem og tilbake</option>
              <option value="round">Rundstrikk</option>
            </select>
          </div>

          <button type="submit">Opprett</button>
        </form>
      </div>
    );
  }

  return (
    <div>
        <h1>{patternConfig.name}</h1>
      <GridCanvas rows={patternConfig.rows} columns={patternConfig.columns} />
      
    </div>
  );
}
