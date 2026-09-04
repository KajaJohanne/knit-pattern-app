import {
  generateMittenSmallGrid,
  mittenSmallColumns,
  mittenSmallRows,
  mittenSmallThumbColumns,
  mittenSmallThumbRows,
} from "./mittenSmall";

export const templates = {
  "mitten-small": {
    name: "Vott (small)",
    rows: mittenSmallRows,
    colums: mittenSmallColumns,
    thumbRows: mittenSmallThumbRows,
    thumbColumns: mittenSmallThumbColumns,
    generateGrid: generateMittenSmallGrid,
  },
};

export type TemplateId = keyof typeof templates;
