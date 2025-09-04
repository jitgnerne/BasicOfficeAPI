import workerController from "../Controllers/workerController.js";
import express from "express";

const router = express.Router();

router.get("/Workers", (req, res) => workerController.getWorkers(req, res));
router.post("/Workers", (req, res) => workerController.createWorker(req, res));
router.delete("/Workers/:id", (req, res) => workerController.deleteWorker(req, res));
router.patch("/Workers/:id", (req, res) => workerController.updateWorker(req, res));

export default router;
