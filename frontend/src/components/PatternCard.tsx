import type { Pattern } from "../types/pattern";
import { Link } from "react-router-dom";

type PatternCardProps = {
  pattern: Pattern;
};

export function PatternCard({ pattern }: PatternCardProps) {
  return (
    <Link
      to={`/pattern/${pattern.id}`}
      className="group block rounded-xl p-3 transition-all duration-300 hover:scale-105 hover:bg-background-blue/40 hover:shadow-lg hover:chadow-charcoal/20"
    >
      <div
        className="grid gap-px rounded-lg overflow-hidden"
        style={{ gridTemplateColumns: `repeat(${pattern.columns}, 1fr)` }}
      >
        {pattern.grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{ backgroundColor: cell.color, aspectRatio: "1 / 1 " }}
            />
          )),
        )}
      </div>
      <div className="font-heading font-bold text-lg text-charcoal text-left mt-3 uppercase tracking-wide">
        <p>{pattern.name}</p>
      </div>
    </Link>
  );
}
