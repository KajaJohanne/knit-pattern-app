import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPatternById, deletePatternById } from "../api/patterns";
import type { Pattern } from "../types/pattern";
import { GridCanvas } from "../components/GridCanvas/GridCanvas";

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
    return <p>Laster...</p>;
  }

  if (pattern === null) {
    return <p>Fant ikke mønsteret:(</p>;
  }

  return (
    <div>
      <h1>{pattern.name}</h1>
      <GridCanvas
        rows={pattern.rows}
        columns={pattern.columns}
        name={pattern.name}
        knittingMode={pattern.knittingMode}
        initialGrid={pattern.grid}
        initialKnittedRows={pattern.knittedRows}
        patternId={pattern.id}
      />
      <button onClick={() => handleDeletePattern(pattern.id)}>
        Slett mønster
      </button>
    </div>
  );
}
