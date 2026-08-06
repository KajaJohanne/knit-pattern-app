import axios from "axios";

import type { Cell, KnittingMode } from "../types/pattern";

const API_URL = "http://localhost:3000";

/* Type som beskriver inndata til denne funksjonen */
type NewPatternData = {
  name: string;
  rows: number;
  columns: number;
  grid: Cell[][];
  knittedRows: boolean[];
  knittingMode: KnittingMode;
};

export async function savePattern(pattern: NewPatternData) {
  const response = await axios.post(`${API_URL}/patterns`, pattern);
  return response.data;
}
