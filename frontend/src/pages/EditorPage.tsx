import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPatternById } from "../api/patterns";
import type { Pattern } from "../types/pattern";
import { GridCanvas } from "../components/GridCanvas/GridCanvas";

export function EditorPage() {
  const { id } = useParams();

  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id === undefined) {
      setIsLoading(false);
      return;
    }

    async function loadPattern(patternId: string) {
      const data = await getPatternById(patternId);
      setPattern(data);
      setIsLoading(false);
    }
    loadPattern(id);
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
      />
    </div>
  );
}
