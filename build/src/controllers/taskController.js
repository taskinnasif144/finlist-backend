"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTasks = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// export const getTasks = async (req: Request, res: Response): Promise<void> => {
//   const { projectId } = req.query;
//   try {
//     const tasks = await prisma.task.findMany({
//       where: { projectId: Number(projectId) },
//       include: {
//         author: true,
//         assignee: true,
//         comments: true,
//         attachments: true,
//       },
//     });
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: `bad request. Error: ${error}` });
//   }
// };
const createTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, priority, tags, startDate, dueDate } = req.body;
    try {
        const newTask = yield prisma.task.create({
            data: { title, description, status, priority, tags, startDate, dueDate },
        });
        console.log(newTask);
        res.status(201).json(newTask);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Error creating Task: ${error}` });
    }
});
exports.createTasks = createTasks;
// export const updateTask = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { taskId } = req.params;
//   const { status } = req.body;
//   try {
//     const tasks = await prisma.task.update({
//       where: { id: Number(taskId) },
//       data: { status: status },
//     });
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: `bad request. Error: ${error}` });
//   }
// };
// export const deleteTasks = async (req: Request, res: Response) => {
//   const { taskId } = req.params;
//   try {
//     const task = await prisma.task.delete({
//       where: { id: Number(taskId) },
//     });
//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ message: `bad request. Error: ${error}` });
//   }
// };
// export const editTask = async (req: Request, res: Response): Promise<void> => {
//   const { taskId } = req.params;
//   const body = req.body;
//   try {
//     const tasks = await prisma.task.update({
//       where: { id: Number(taskId) },
//       data: body,
//     });
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: `bad request. Error: ${error}` });
//   }
// };
