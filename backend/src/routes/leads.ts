import { Router } from "express";
import LeadController from "../controllers/LeadController";
const router = Router();
router.get("/", LeadController.getAllLeads);

export default router;
