import { useEffect } from "react";
import { useState } from "react";
import { getPatterns } from "../api/patterns";
import type { Pattern } from "../types/pattern";
import { PatternCard } from "../components/PatternCard";
import { Link, NavLink } from "react-router-dom";
import { Navigation } from "../components/Navigation/Navigation";

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
  }, []);

  return (
    <div>
      <Navigation />
      {/*<section className="py-36 px-8 md:px-16 w-full mx-auto bg-cream-light">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <h1 className="font-heading text-5xl font-bold text-charcoal">
            MØNSTER
          </h1>
          <p className="text-background-blue uppercase max-w-md text-right">
            Her kan du tegne strikkediagrammer rute for rute, og lage akkurat de
            designene du ønsker. Marker rader som strikket etterhvert som du
            jobber deg gjennom prosjektet, og hold oversikt over progresjon.
          </p>
        </div>
      </section> */}

      <section className="bg-cream-light min-h-screen py-12 px-8">
        {isLoading && (
          <p className="text-charcoal text-center">Laster inn mønster..</p>
        )}

        <div className="max-w-none mx-auto">
          <h2 className="font-heading font-bold text-2xl mb-6 text-background-blue pl-3">
            MØNSTER
          </h2>
          <div className="columns-1 sm:columns-2 md:columns-3 gap-8 mx-auto">
            {!isLoading &&
              patterns.map((pattern) => (
                <div
                  key={pattern.id}
                  className="break-inside-avoid mb-8 max-w-[280px] mx-auto sm:max-w-none"
                >
                  <PatternCard pattern={pattern} />
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-8 md:px-16 w-full mx-auto bg-background-blue">
        <p className="text-cream-light text-center">♥</p>
      </section>
    </div>
  );
}
