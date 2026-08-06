import { useEffect } from "react";
import { useState } from "react";
import { getPatterns } from "../api/patterns";
import { Link } from "react-router-dom";
import type { Pattern } from "../types/pattern";

export function HomePage() {
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadPatterns() {
    const data = await getPatterns();
    setPatterns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadPatterns();
  });

  return (
    <div>
      <h1>Dette er landingssiden. Her skal tidligere mønstre vises</h1>
      <p>:)</p>

      {isLoading && <p>Laster..</p>}

      {!isLoading &&
        patterns.map((pattern) => (
          <Link key={pattern.id} to={`/pattern/${pattern.id}`}>
            <p>{pattern.name}</p>
          </Link>
        ))}
    </div>
  );
}
