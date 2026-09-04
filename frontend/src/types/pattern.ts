export type KnittingMode = "flat" | "round";

export type Cell = {
  color: string;
  blocked?: boolean;
};

export type Pattern = {
  id: number;
  name: string;
  rows: number;
  columns: number;
  grid: Cell[][];
  knittedRows: boolean[];
  knittingMode: KnittingMode;
  thumbGrid?: Cell[][];
  thumbKnittedRows?: boolean[];
};
