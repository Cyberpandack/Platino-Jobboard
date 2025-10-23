import express from "express";
import { createApplication, deleteApplication, getAllApplication, getApplicationById, updateApplication } from "../controllers/applicationController.js";
const router = express.Router();

router.post("/Application", createApplication);
router.get("/Application", getAllApplication);
router.get("/Application/:id", getApplicationById);
router.put("/Application/:id", updateApplication);
router.delete("/Application/:id", deleteApplication);

export default router;