/* Hvilken URL som trigger hvilken controller funksjon */

import express from "express";
import {
  createPattern,
  getPatterns,
  getPatternById,
  deletePattern,
  updatePattern,
} from "../controller/patternController";

const router = express.Router();

router.post("/patterns", createPattern);
router.get("/patterns", getPatterns);
router.get("/patterns/:id", getPatternById);
router.delete("/patterns/:id", deletePattern);
router.put("/patterns/:id", updatePattern);

export default router;
