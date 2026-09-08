export function ChartDescriptions() {
  return (
    <div className="flex flex-col gap-2 text-sm font-heading text-charcoal">
      <div className="flex items-center gap-2">
        <span
          className="w-4 h-4 rounded-sm"
          style={{ background: "rgba(255, 0, 0, 0.7)" }}
        />
        <span>Strikk 2 rett sammen</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="w-4 h-4 rounded-sm"
          style={{ background: "rgba(0, 255, 0, 0.7)" }}
        />
        <span>1 maske løst av, strikk 1r, løft den løse over</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="w-4 h-4 rounded-sm"
          style={{ background: "rgba(0, 0, 255, 0.7)" }}
        />
        <span>1 maske løst av, strikk 2r sammen, løft den løse over</span>
      </div>
    </div>
  );
}
