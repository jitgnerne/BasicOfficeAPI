import { prisma } from "../prisma/PrismaClient.js";

class WorkplaceService {
    async getAllWorkplaces() {
        return await prisma.workplace.findMany({include: { workers: true }});
    }

    async getWorkplaceById(id) {
        return await prisma.workplace.findUnique({
            where: { id: id },
            include: { workers: true }
        })
    }

    async getWorkplaceByFilters(filters) {
        return await prisma.workplace.findMany({
            where: filters,
            include: { workers: true }
        })
    }

    async createWorkplace(workplaceData) {
        return await prisma.workplace.create({
            data: workplaceData
        })
    }

    async deleteWorkplace(id) {
        return await prisma.workplace.delete({
            where: { id: id }
        })
    }

    async updateWorkplace(id, updatedData) {
        return await prisma.workplace.update({
            where: { id: id },
            data: updatedData,
            include: { workers: true }
        })
    }
}

export default new WorkplaceService();
