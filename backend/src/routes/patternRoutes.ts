/* Hvilken URL som trigger hvilken controller funksjon */

import express from "express";
import {
  createPattern,
  getPatterns,
  getPatternById,
} from "../controller/patternController";

const router = express.Router();

router.post("/patterns", createPattern);
router.get("/patterns", getPatterns);
router.get("/patterns/:id", getPatternById);

export default router;
