import workplaceController from "../Controllers/workplaceController.js";
import express from "express";

const router = express.Router();

router.get("/Workplaces", (req, res) => workplaceController.getWorkplaces(req, res));
router.post("/Workplaces", (req, res) => workplaceController.createWorkplace(req, res));
router.delete("/Workplaces/:id", (req, res) => workplaceController.deleteWorkplace(req, res));
router.patch("/Workplaces/:id", (req, res) => workplaceController.updateWorkplace(req, res));

export default router;
