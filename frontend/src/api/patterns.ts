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

export async function getPatterns() {
  const response = await axios.get(`${API_URL}/patterns`);
  return response.data;
}

export async function getPatternById(id: number) {
  const response = await axios.get(`${API_URL}/patterns/${id}`);
  return response.data;
}

export async function deletePatternById(id: number) {
  const response = await axios.delete(`${API_URL}/patterns/${id}`);
  return response.data;
}
