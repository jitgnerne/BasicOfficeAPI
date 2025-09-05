import { prisma } from "../prisma/PrismaClient.js";

class WorkerService {
    async getAllWorkers() {
        return await prisma.Worker.findMany({include: {workplace: true}});
    }

    async getWorkerById(id) {
        return await prisma.Worker.findUnique({
            where: { id: id },
            include: { workplace: true }
        })
    }

    async getWorkersByFilters(filters) {
        return await prisma.Worker.findMany({
            where: filters,
            include: { workplace: true }
        })
    } 

    async createWorker(workerData) {
        return await prisma.Worker.create({
            data: workerData,
            include: { workplace: true }
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
            data: updatedData,
            include: { workplace: true }
        })
    }
}

export default new WorkerService();
