import type { Cell } from "../types/pattern";

// Vott
export const mittenSmallRows = 73;
export const mittenSmallColumns = 52;

// Tommel
export const mittenSmallThumbRows = 34;
export const mittenSmallThumbColumns = 22;

// Farger for å forklare økinger og fellinger i diagrammet
export const SIGNAL_RED = "#ff0000"; //strikk 2 rett sammen
export const SIGNAL_GREEN = "#00ff00"; //1 løs av, strikk 1, løft over
export const SIGNAL_BLUE = "#0066ff"; // 1 løs av, strikk 2 sammen, løft over
export const BLOCKED = "#e0e0e0";

const TAPER_ROWS = 11; // til spissen på vott
const SECTION_WIDTH = 23; //

const THUMB_ZONE_123_ROW_THRESHOLD = 14; // sone 1, 2, 3, finnes fra og med denne raden
const THUMB_ZONE_46_ROW_THRESHOLD = 10; // sone 4 og 6 finnes fra og med denne raden

const THUMB_ZONE2_TAPER_ROWS = 4; // sone 2 felles de øverste 4 radene
const THUMB_ZONE5_TAPER_ROWS = 5; // sone 5 felles de øverste 5 radene

function thumbRowFromBottom(row: number): number {
  return mittenSmallThumbRows - 1 - row;
}

// Seksjoner i vottediagrammet
const SECTION_A_START = 0;
const SECTION_A_END = 2;
const SECTION_B_START = 3;
const SECTION_B_END = 25;
const SECTION_C_START = 26;
const SECTION_C_END = 28;
const SECTION_D_START = 29;
const SECTION_D_END = 51;

// Utskjæring til tommel i vottediagrammet
const THUMB_OPENING_ROW_START = 38;
const THUMB_OPENING_ROW_END = 50;
const THUMB_OPENING_COL_START = SECTION_D_START + 2;
const THUMB_OPENING_COL_END = SECTION_D_START + 4;

// Seksjoner i tommeldiagrammet
const THUMB_ZONE1_START = 0;
const THUMB_ZONE1_END = 0;
const THUMB_ZONE2_START = 1;
const THUMB_ZONE2_END = 7;
const THUMB_ZONE3_START = 8;
const THUMB_ZONE3_END = 8;
const THUMB_ZONE4_START = 9;
const THUMB_ZONE4_END = 9;
const THUMB_ZONE5_START = 10;
const THUMB_ZONE5_END = 20;
const THUMB_ZONE6_START = 21;
const THUMB_ZONE6_END = 21;

type MittenCellState =
  | "outside"
  | "signal-red"
  | "signal-green"
  | "signal-blue"
  | "editable";

// Blokkerte ruter for tommel i vottediagram
function isThumbOpening(row: number, col: number): boolean {
  return (
    row >= THUMB_OPENING_ROW_START &&
    row <= THUMB_OPENING_ROW_END &&
    col >= THUMB_OPENING_COL_START &&
    col <= THUMB_OPENING_COL_END
  );
}

function getMittenCellState(row: number, col: number): MittenCellState {
  const isInSectionA = col >= SECTION_A_START && col <= SECTION_A_END;
  const isInSectionC = col >= SECTION_C_START && col <= SECTION_C_END;

  if (isInSectionA || isInSectionC) {
    return "editable";
  }

  if (isThumbOpening(row, col)) {
    return "outside";
  }

  if (row >= TAPER_ROWS) {
    return "editable";
  }

  const isInSectionB = col >= SECTION_B_START && col <= SECTION_B_END;
  const isInSectionD = col >= SECTION_D_START && col <= SECTION_D_END;

  if (!isInSectionB && !isInSectionD) {
    return "outside";
  }

  const sectionStart = isInSectionB ? SECTION_B_START : SECTION_D_START;

  const activeWidth = 3 + 2 * row;
  const margin = (SECTION_WIDTH - activeWidth) / 2;
  const activeStart = sectionStart + margin;
  const activeEnd = activeStart + activeWidth - 1;

  const isActive = col >= activeStart && col <= activeEnd;

  if (!isActive) {
    return "outside";
  }

  if (row === 0) {
    return "signal-blue";
  }

  const isLeftDecrease = col === activeStart || col === activeStart + 1;
  const isRightDecrease = col === activeEnd - 1 || col === activeEnd;

  if (isLeftDecrease) {
    return "signal-red";
  }

  if (isRightDecrease) {
    return "signal-green";
  }

  return "editable";
}

export function generateMittenSmallGrid(): Cell[][] {
  const grid: Cell[][] = [];

  for (let row = 0; row < mittenSmallRows; row++) {
    const currentRow: Cell[] = [];
    for (let col = 0; col < mittenSmallColumns; col++) {
      const state = getMittenCellState(row, col);

      if (state === "outside") {
        currentRow.push({ color: BLOCKED, blocked: true });
      } else if (state === "signal-blue") {
        currentRow.push({ color: SIGNAL_BLUE, blocked: true });
      } else if (state === "signal-red") {
        currentRow.push({ color: SIGNAL_RED, blocked: true });
      } else if (state === "signal-green") {
        currentRow.push({ color: SIGNAL_GREEN, blocked: true });
      } else {
        currentRow.push({ color: "#fffdf9", blocked: false });
      }
    }
    grid.push(currentRow);
  }
  return grid;
}

function getMittenThumbCellState(row: number, col: number): MittenCellState {
  const rowFromBottom = thumbRowFromBottom(row);

  const isInZone1 = col >= THUMB_ZONE1_START && col <= THUMB_ZONE1_END;
  const isInZone2 = col >= THUMB_ZONE2_START && col <= THUMB_ZONE2_END;
  const isInZone3 = col >= THUMB_ZONE3_START && col <= THUMB_ZONE3_END;
  const isInZone4 = col >= THUMB_ZONE4_START && col <= THUMB_ZONE4_END;
  const isInZone5 = col >= THUMB_ZONE5_START && col <= THUMB_ZONE5_END;
  const isInZone6 = col >= THUMB_ZONE6_START && col <= THUMB_ZONE6_END;

  // sone 1 og 3, rette kolonner uten felling
  if (isInZone1 || isInZone3) {
    return rowFromBottom >= THUMB_ZONE_123_ROW_THRESHOLD
      ? "editable"
      : "outside";
  }

  // sone 4 og 6, rette kollonner uten felling, egen radstart
  if (isInZone4 || isInZone6) {
    return rowFromBottom >= THUMB_ZONE_46_ROW_THRESHOLD
      ? "editable"
      : "outside";
  }

  // sone 2
  if (isInZone2) {
    if (rowFromBottom < THUMB_ZONE_123_ROW_THRESHOLD) {
      return "outside";
    }

    if (row >= THUMB_ZONE2_TAPER_ROWS) {
      return "editable"; // under fellingssonen er det full bredde
    }

    const zoneWidth = THUMB_ZONE2_END - THUMB_ZONE2_START + 1;
    const activeWidth = 1 + 2 * row;
    const margin = (zoneWidth - activeWidth) / 2;
    const activeStart = THUMB_ZONE2_START + margin;
    const activeEnd = activeStart + activeWidth - 1;

    if (col < activeStart || col > activeEnd) {
      return "outside";
    }

    if (row === 0) {
      return "editable";
    }

    if (row === 1) {
      return "signal-blue";
    }

    const isLeftDecrease = col === activeStart || col === activeStart + 1;
    const isRightDecrease = col === activeEnd - 1 || col === activeEnd;
    if (isLeftDecrease) return "signal-red";
    if (isRightDecrease) return "signal-green";
    return "editable";
  }

  // sone 5, økes i bunnen, felles i toppen
  if (isInZone5) {
    const zoneWidth = THUMB_ZONE5_END - THUMB_ZONE5_START + 1;

    if (row < THUMB_ZONE5_TAPER_ROWS) {
      const activeWidth = 3 + 2 * row;
      const margin = (zoneWidth - activeWidth) / 2;
      const activeStart = THUMB_ZONE5_START + margin;
      const activeEnd = activeStart + activeWidth - 1;

      if (col < activeStart || col > activeEnd) return "outside";
      if (row === 0) return "signal-blue";

      const isLeftDecrease = col === activeStart || col === activeStart + 1;
      const isRightDecrease = col === activeEnd - 1 || col === activeEnd;
      if (isLeftDecrease) return "signal-red";
      if (isRightDecrease) return "signal-green";
      return "editable";
    }

    if (rowFromBottom < 10) {
        let activeWidth: number; 
        if (rowFromBottom === 0) {
            activeWidth = 3; 
        } else {
            const growthStep = Math.ceil(rowFromBottom / 2);
            activeWidth = 3 + 2 * growthStep;
        }
      
      
      const margin = (zoneWidth - activeWidth) / 2;
      const activeStart = THUMB_ZONE5_START + margin;
      const activeEnd = activeStart + activeWidth - 1;

      if (col < activeStart || col > activeEnd) return "outside";
      return "editable";
    }

    return "editable";
  }

  return "outside";
}

export function generateMittenSmallThumbGrid(): Cell[][] {
  const grid: Cell[][] = [];

  for (let row = 0; row < mittenSmallThumbRows; row++) {
    const currentRow: Cell[] = [];
    for (let col = 0; col < mittenSmallThumbColumns; col++) {
      const state = getMittenThumbCellState(row, col);

      if (state === "outside") {
        currentRow.push({ color: BLOCKED, blocked: true });
      } else if (state === "signal-blue") {
        currentRow.push({ color: SIGNAL_BLUE, blocked: true });
      } else if (state === "signal-red") {
        currentRow.push({ color: SIGNAL_RED, blocked: true });
      } else if (state === "signal-green") {
        currentRow.push({ color: SIGNAL_GREEN, blocked: true });
      } else {
        currentRow.push({ color: "#fffdf9", blocked: false });
      }
    }
    grid.push(currentRow);
  }
  return grid;
}
