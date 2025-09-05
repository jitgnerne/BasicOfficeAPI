import { prisma } from "../prisma/PrismaClient.js";
import workplaceService from "../Services/workplaceService.js";

class WorkplaceController {
    async getWorkplaces(req, res) {
        const { name, id, cep, number } = req.query;

        let workplaces;

        if (req.query) {
            const filters = { name: name, id: id, cep: cep, number: number };
            workplaces = await workplaceService.getWorkplaceByFilters(filters);
            return res.status(200).json(workplaces);
        } else {
            workplaces = await workplaceService.getAllWorkplaces();
            return res.status(200).json(workplaces);
        }
    }

    async createWorkplace(req, res) {
        const { name, cep, number, workers } = req.body;

        if (!name || !cep || !number) {
            return res.status(400).json({ message: "Missing required filds" })
        } else {
            if (await prisma.workplace.findFirst({ where: {cep: cep, number: number}})) {
                return res.status(409).json({ message: "You can not create a workplace with cep or number equal to another"});
            } else {
                const createdWorkplace = await workplaceService.createWorkplace({
                    name: String(name),
                    cep: String(cep),
                    number: String(number),
                    workers: workers?.length
                        ? {
                            create: workers.map(worker => ({
                                name: worker.name,
                                email: worker.email,
                                JobFunction: worker.JobFunction,
                                WorkTime: parseInt(worker.WorkTime),
                                course: worker.course,
                                age: parseInt(worker.age)
                            }))
                        }
                        : undefined
                });

                const newWorkplace = await prisma.workplace.findUnique({
                    where: { id: createdWorkplace.id },
                    include: { workers: true }
                });

                return res.status(201).json(newWorkplace);
            }
        }
    }

    async deleteWorkplace(req, res) {
        const { id } = req.params;
        const workplace = await workplaceService.getWorkplaceById(id);
        return await workplaceService.deleteWorkplace(id)
        .then(() => {return res.status(200).json({ message: "Workplace are deleted", workplace: workplace })})
        .catch(() => {return res.status(404).json({ message: "Workplace not found" })})
    }

    async updateWorkplace(req, res) {
        const { id } = req.params;
        const { name, cep, number, workers } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Missing workplace id" })
        } else {
            const existingWorkplace = await workplaceService.getWorkplaceById(id);
            if (!existingWorkplace) {
                return res.status(404).json({ message: "This Workplace id is not valid" });
            } else {
                const updatedWorkplaceData = {
                    name: name ?? existingWorkplace.name,
                    cep: cep !== undefined ? parseInt(cep) : existingWorkplace.cep,
                    number: number !== undefined ? parseInt(number) : existingWorkplace.number,
                    workers: workers?.length
                    ? {
                        create: workers.map(worker => ({
                            name: worker.name,
                            email: worker.email,
                            JobFunction: worker.JobFunction,
                            WorkTime: parseInt(worker.WorkTime),
                            course: worker.course,
                            age: parseInt(worker.age)
                        }))
                    }
                    : undefined
                }

                return res.status(200).json(await workplaceService.updateWorkplace(id, updatedWorkplaceData));
            }
        }
    }
}

export default new WorkplaceController();
