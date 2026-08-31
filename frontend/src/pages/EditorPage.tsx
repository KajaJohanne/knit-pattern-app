import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPatternById, deletePatternById } from "../api/patterns";
import type { Pattern } from "../types/pattern";
import { GridCanvas } from "../components/GridCanvas/GridCanvas";
import { Navigation } from "../components/Navigation/Navigation";
import { Button } from "../components/Button";

export function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function handleDeletePattern(patternId: number) {
    const confirmed = window.confirm(
      "Er du sikker på at du vil slette mønsteret? Det kan ikke gjøres om.",
    );

    if (!confirmed) {
      return;
    }

    await deletePatternById(patternId);
    navigate("/");
  }

  useEffect(() => {
    if (id === undefined) {
      setIsLoading(false);
      return;
    }

    async function loadPattern(patternId: number) {
      const data = await getPatternById(patternId);
      setPattern(data);
      setIsLoading(false);
    }
    loadPattern(Number(id));
  }, [id]);

  if (isLoading) {
    return (
      <div>
        <Navigation />
        <section className="bg-cream-light min-h-screen py-12 px-8 flex items-center justify-center">
          <p className="font-heading text-charcoal uppercase">Laster...</p>
        </section>
      </div>
    );
  }

  if (pattern === null) {
    return (
      <div>
        <Navigation />
        <section className="bg-cream-light min-h-screen py-12 px-8 flex items-center justify-center">
          <p className="font-heading text-charcoal uppercase">
            Fant ikke mønsteret:(
          </p>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <section className="bg-cream-light min-h-screen py-12 px-8">
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center gap-6">
          <h1 className="font-heading font-bold text-2xl text-espresso uppercase mb-2">
            {pattern.name}
          </h1>

          <GridCanvas
            rows={pattern.rows}
            columns={pattern.columns}
            name={pattern.name}
            knittingMode={pattern.knittingMode}
            initialGrid={pattern.grid}
            initialKnittedRows={pattern.knittedRows}
            patternId={pattern.id}
          />


          <Button
            variant="danger"
            onClick={() => handleDeletePattern(pattern.id)}
          >
            Slett mønster
          </Button>
        </div>
      </section>

      <section className="py-12 px-8 md:px-16 w-full mx-auto bg-background-blue">
        <p className="text-cream-light text-center">♥</p>
      </section>
    </div>
  );
}
