import express from "express";
import { createCompany, deleteCompany, getAllCompany, getCompanyById, updateCompany } from "../controllers/companyController.js";
const router = express.Router();

router.post("/company", createCompany);
router.get("/company", getAllCompany);
router.get("/company/:id", getCompanyById);
router.put("/company/:id", updateCompany);
router.delete("/company/:id", deleteCompany);

export default router;