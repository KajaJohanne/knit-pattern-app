import { useState, type FormEvent } from "react";
import { GridCanvas } from "../components/GridCanvas/GridCanvas";
import type { Cell, KnittingMode } from "../types/pattern";
import { Navigation } from "../components/Navigation/Navigation";
import { Button } from "../components/Button";
import { templates, type TemplateId } from "../templates";

type PatternType = "custom" | TemplateId;

export function NewPatternPage() {
  const [name, setName] = useState("");
  const [rows, setRows] = useState("1");
  const [columns, setColums] = useState("1");
  const [knittingMode, setKnittingMode] = useState<KnittingMode>("flat");
  const [patternType, setPatternType] = useState<PatternType>("custom");

  const [patternConfig, setPatternConfig] = useState<{
    name: string;
    rows: number;
    columns: number;
    knittingMode: KnittingMode;
    initialGrid?: Cell[][];
    initialThumbGrid?: Cell[][];
  } | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (patternType === "custom") {
      setPatternConfig({
        name,
        rows: Number(rows),
        columns: Number(columns),
        knittingMode,
      });
      return;
    }

    const template = templates[patternType];
    setPatternConfig({
      name,
      rows: template.rows,
      columns: template.columns,
      knittingMode,
      initialGrid: template.generateGrid(),
      initialThumbGrid: template.generateThumbGrid(),
    });
  }

  if (patternConfig === null) {
    return (
      <div>
        <Navigation />

        <section className="bg-cream-light min-h-screen py-12 px-8 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-[10rem_1fr] auto-rows-min gap-x-4 gap-y-8 items-center w-full max-w-md"
          >
            <h1 className="col-span-2 font-heading font-bold text-2xl text-charcoal uppercase text-center">
              Nytt mønster
            </h1>

            <label
              htmlFor="name"
              className="font-heading font-bold uppercase text-sm text-charcoal"
            >
              Navn på mønster
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="font-heading border-2 border-background-blue rounded-full py-2 px-5 focus:outline-none focus:border-espresso uppercase"
            />

            <label
              htmlFor="patternType"
              className="font-heading font-bold uppercase text-sm text-charcoal"
            >
              Mønster
            </label>
            <select
              id="patternType"
              value={patternType}
              onChange={(e) => setPatternType(e.target.value as PatternType)}
              className="font-heading border-2 border-background-blue rounded-full py-2 px-5 focus:outline-none focus:border-espresso uppercase"
            >
              <option value="custom">Egendefinert</option>
              {Object.entries(templates).map(([id, template]) => (
                <option key={id} value={id}>
                  {template.name}
                </option>
              ))}
            </select>

            {patternType === "custom" && (
              <>
                <label
                  htmlFor="rows"
                  className="font-heading font-bold uppercase text-sm text-charcoal"
                >
                  Antall rader
                </label>
                <input
                  id="rows"
                  type="number"
                  min={1}
                  max={200}
                  value={rows}
                  onChange={(e) => setRows(e.target.value)}
                  className="font-heading border-2 border-background-blue rounded-full py-2 px-5 focus:outline-none focus:border-espresso"
                />
                
                  <label
                    htmlFor="colums"
                    className="font-heading font-bold uppercase text-sm text-charcoal"
                  >
                    Antall kolonner
                  </label>
                  <input
                    id="columns"
                    type="number"
                    min={1}
                    max={200}
                    value={columns}
                    onChange={(e) => setColums(e.target.value)}
                    className="font-heading border-2 border-background-blue rounded-full py-2 px-5 focus:outline-none focus:border-espresso flex-1"
                  />
              </>
            )}

            <label
              htmlFor="mode"
              className="font-heading font-bold uppercase text-sm text-charcoal"
            >
              Frem og tilbake eller rundstrikk?
            </label>
            <select
              id="mode"
              value={knittingMode}
              onChange={(e) => setKnittingMode(e.target.value as KnittingMode)}
              className="font-heading border-2 border-background-blue rounded-full py-2 px-5 focus:outline-none focus:border-espresso uppercase"
            >
              <option value="flat">Frem og tilbake</option>
              <option value="round">Rundstrikk</option>
            </select>

            <Button type="submit" className="col-span-2 mt-2">
              Opprett
            </Button>
          </form>
        </section>
        <section className="py-12 px-8 md:px-16 w-full mx-auto bg-background-blue">
          <p className="text-cream-light text-center">♥</p>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <section className="bg-cream-light min-h-screen py-12 px-8">
        <div className="flex flex-col items-center">
          <h1 className="font-heading font-bold text-2xl text-espresso uppercase mb-2">
            {patternConfig.name}
          </h1>
          <p className="font-heading text-charcoal uppercase text-sm mb-8">
            {patternConfig.knittingMode === "flat"
              ? "Strikkes frem og tilbake"
              : "Strikkes rundt"}
          </p>
          <GridCanvas
            rows={patternConfig.rows}
            columns={patternConfig.columns}
            name={patternConfig.name}
            knittingMode={patternConfig.knittingMode}
            initialGrid={patternConfig.initialGrid}
            initialThumbGrid={patternConfig.initialThumbGrid}
          />
        </div>
      </section>
      <section className="py-12 px-8 md:px-16 w-full mx-auto bg-background-blue">
        <p className="text-cream-light text-center">♥</p>
      </section>
    </div>
  );
}
