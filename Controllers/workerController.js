import { prisma } from "../prisma/PrismaClient.js";
import workerService from "../Services/workerService.js";

class WorkerController {
    async getWorkers(req, res) {
        const { course, id, name, JobFunction, email } = req.query;

        let workers;

        if (req.query){
            const filters = { course: course, id: id, name: name, JobFunction: JobFunction, email: email };
            workers = await workerService.getWorkersByFilters(filters);
            return res.status(200).json(workers);
        } else {
            workers = await workerService.getAllWorkers();
            return res.status(200).json(workers);
        }
    }

    async createWorker(req, res) {
        const { course, name, JobFunction, email, WorkTime, age } = req.body;

        if (!course || !name || !JobFunction || !email || !WorkTime || !age) {
            return res.status(400).json({ message: "Missing required filds"});
        } else {
            if (await prisma.Worker.findUnique({ where: {email : email} })) {
                return res.status(409).json({ message: "You can not create a worker with email equal to another"});
            }
            const newWorker = await workerService.createWorker({ course, name, JobFunction, email, WorkTime, age});
            return res.status(201).json(newWorker);
        }
    }

    async deleteWorker(req, res) {
        const { id } = req.params

        const Worker = await workerService.getWorkerById(id);
        
        return await workerService.deleteWorker(id)
        .then(() => {return res.status(200).json({ message: "Worker are deleted", worker: Worker })})
        .catch(() => {return res.status(404).json({ message: "Worker not found"})})
    }

    async updateWorker(req, res) {
        const { id } = req.params;
        const { course, name, JobFunction, email, WorkTime, age } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Missing worker id"});
        } else {
            const existingWorker = await workerService.getWorkerById(req.params.id);
            if (!existingWorker) {
                return res.status(404).json({ message: "Worker not found"});
            }

            const updatedWorkerData = {
                course: course ?? existingWorker.course,
                name: name ?? existingWorker.name,
                JobFunction: JobFunction ?? existingWorker.JobFunction,
                email: email ?? existingWorker.email,
                WorkTime: WorkTime !== undefined ? parseInt(WorkTime) : existingWorker.WorkTime,
                age: age !== undefined ? parseInt(age) : existingWorker.age
            }

            const updatedWorker = await workerService.updateWorker(id, updatedWorkerData);
            return res.status(200).json(updatedWorker);
        }
    }
}

export default new WorkerController();
