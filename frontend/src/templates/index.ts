import {
  generateMittenSmallGrid,
  generateMittenSmallThumbGrid,
  mittenSmallColumns,
  mittenSmallRows,
  mittenSmallThumbColumns,
  mittenSmallThumbRows,
} from "./mittenSmall";

export const templates = {
  "mitten-small": {
    name: "Vott (small)",
    rows: mittenSmallRows,
    columns: mittenSmallColumns,
    thumbRows: mittenSmallThumbRows,
    thumbColumns: mittenSmallThumbColumns,
    generateGrid: generateMittenSmallGrid,
    generateThumbGrid: generateMittenSmallThumbGrid,
  },
};

export type TemplateId = keyof typeof templates;
