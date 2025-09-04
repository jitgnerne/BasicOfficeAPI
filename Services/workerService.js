import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

class WorkerService {
    async getAllWorkers() {
        return await prisma.Worker.findMany();
    }

    async getWorkerById(id) {
        return await prisma.Worker.findUnique({
            where: { id: id }
        })
    }

    async getWorkersByFilters(filters) {
        return await prisma.Worker.findMany({
            where: filters
        })
    } 

    async createWorker(workerData) {
        return await prisma.Worker.create({
            data: workerData
        });
    }

    async deleteWorker(id) {
        return await prisma.Worker.delete({
            where: { id: id }
        })
    }

    async updateWorker(id, updatedData) {
        return await prisma.Worker.update({
            where: { id: id },
            data: updatedData
        })
    }
}

export default new WorkerService();
