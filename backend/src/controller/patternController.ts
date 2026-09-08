/* Hva som skal skje ved hver type forespørsel */

import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export const createPattern = async (req: Request, res: Response) => {
  const { name, rows, columns, grid, knittedRows, knittingMode, thumbGrid, thumbKnittedRows } = req.body;
  try {
    const pattern = await prisma.pattern.create({
      data: {
        name,
        rows,
        columns,
        grid,
        knittedRows,
        knittingMode,
        thumbGrid, 
        thumbKnittedRows
      },
    });
    res.status(201).json(pattern);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ukjent feil";
    res.status(400).json({ msg: message });
  }
};

export const getPatterns = async (req: Request, res: Response) => {
  try {
    const response = await prisma.pattern.findMany();
    res.status(200).json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ukjent feil";
    res.status(500).json({ msg: message });
  }
};

export const getPatternById = async (req: Request, res: Response) => {
  try {
    const response = await prisma.pattern.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ukjent feil";
    res.status(404).json({ msg: message });
  }
};

export const deletePattern = async (req: Request, res: Response) => {
  try {
    const response = await prisma.pattern.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ukjent feil";
    res.status(404).json({ msg: message });
  }
};

export const updatePattern = async (req: Request, res: Response) => {
  const { name, rows, columns, grid, knittedRows, knittingMode, thumbGrid, thumbKnittedRows } = req.body;

  try {
    const pattern = await prisma.pattern.update({
      where: {
        id: Number(req.params.id),
      },
      data: { name, rows, columns, grid, knittedRows, knittingMode, thumbGrid, thumbKnittedRows },
    });
    res.status(200).json(pattern);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Ukejnt feil";
    res.status(404).json({ msg: message });
  }
};
