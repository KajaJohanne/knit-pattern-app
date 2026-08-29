import { useState, type FormEvent } from "react";
import { GridCanvas } from "../components/GridCanvas/GridCanvas";
import type { KnittingMode } from "../types/pattern";
import { Navigation } from "../components/Navigation/Navigation";
import { Button } from "../components/Button";

export function NewPatternPage() {
  const [name, setName] = useState("");
  const [rows, setRows] = useState("1");
  const [columns, setColums] = useState("1");
  const [knittingMode, setKnittingMode] = useState<KnittingMode>("flat");

  const [patternConfig, setPatternConfig] = useState<{
    name: string;
    rows: number;
    columns: number;
    knittingMode: KnittingMode;
  } | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setPatternConfig({
      name,
      rows: Number(rows),
      columns: Number(columns),
      knittingMode,
    });
  }

  if (patternConfig === null) {
    return (
      <div>
        <Navigation />

        <section className="bg-cream-light min-h-screen py-12 px-8 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-full max-w-md"
          >
            <h1 className="font-heading font-bold text-2xl text-charcoal uppercase mb-4">
              Nytt mønster
            </h1>
            <div className="flex flex-row gap-4 items-center">
              <label
                htmlFor="name"
                className="font-heading font-bold uppercase text-sm text-charcoal w-40 flex-shrink-0"
              >
                Navn på mønster
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="font-heading border-2 border-background-blue rounded-full py-2 px-5 focus:outline-none focus:border-espresso uppercase flex-1"
              />
            </div>

            <div className="flex flex-row gap-4 items-center">
              <label
                htmlFor="rows"
                className="font-heading font-bold uppercase text-sm text-charcoal w-40 flex-shrink-0"
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
                className="font-heading border-2 border-background-blue rounded-full py-2 px-5 focus:outline-none focus:border-espresso flex-1"
              />
            </div>

            <div className="flex flex-row gap-4 items-center">
              <label
                htmlFor="colums"
                className="font-heading font-bold uppercase text-sm text-charcoal w-40 flex-shrink-0"
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
            </div>

            <div className="flex flex-row gap-4 items-center">
              <label
                htmlFor="mode"
                className="font-heading font-bold uppercase text-sm text-charcoal w-40 flex-shrink-0"
              >
                Frem og tilbake eller rundstrikk?
              </label>
              <select
                id="mode"
                value={knittingMode}
                onChange={(e) =>
                  setKnittingMode(e.target.value as KnittingMode)
                }
                className="font-heading border-2 border-background-blue rounded-full py-2 px-5 focus:outline-none focus:border-espresso uppercase flex-1"
              >
                <option value="flat">Frem og tilbake</option>
                <option value="round">Rundstrikk</option>
              </select>
            </div>

            <Button type="submit" className="mt-2">
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
        <div className="max-w-8xl mx-auto">
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
          />
        </div>
      </section>
      <section className="py-12 px-8 md:px-16 w-full mx-auto bg-background-blue">
        <p className="text-cream-light text-center">♥</p>
      </section>
    </div>
  );
}
