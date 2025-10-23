import express from "express";
import { createAdvertissement, deleteAdvertissement, getAllAdvertissement, getAdvertissementById, updateAdvertissement } from "../controllers/advertissementController.js";
const router = express.Router();

router.post("/Advertissement", createAdvertissement);
router.get("/Advertissement", getAllAdvertissement);
router.get("/Advertissement/:id", getAdvertissementById);
router.put("/Advertissement/:id", updateAdvertissement);
router.delete("/Advertissement/:id", deleteAdvertissement);

export default router;