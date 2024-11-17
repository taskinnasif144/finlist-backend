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
exports.removeTaskFromProject = exports.assignTaskToProject = exports.editTask = exports.deleteTasks = exports.updateTask = exports.createTasks = exports.getTasks = exports.getAllTasks = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield prisma.task.findMany();
        const taskWithProjectName = yield Promise.all(tasks.map((task) => __awaiter(void 0, void 0, void 0, function* () {
            if (task.projectId) {
                const project = yield prisma.project.findUnique({
                    where: { id: task.projectId },
                });
                return Object.assign(Object.assign({}, task), { projectName: project === null || project === void 0 ? void 0 : project.name });
            }
            return Object.assign({}, task);
        })));
        res.json(taskWithProjectName);
    }
    catch (error) {
        res.status(500).json({ message: `bad request. Error: ${error}` });
    }
});
exports.getAllTasks = getAllTasks;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    if (projectId === "none") {
        res.json([]);
    }
    else {
        try {
            const tasks = yield prisma.task.findMany({
                where: { projectId: projectId },
            });
            res.json(tasks);
        }
        catch (error) {
            res.status(500).json({ message: `bad request. Error: ${error}` });
        }
    }
});
exports.getTasks = getTasks;
const createTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, priority, tags, startDate, dueDate, projectId, } = req.body;
    try {
        const newTask = yield prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                projectId,
            },
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).json({ message: `Error creating Task: ${error}` });
    }
});
exports.createTasks = createTasks;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const { status } = req.body;
    try {
        const tasks = yield prisma.task.update({
            where: { id: taskId },
            data: { status: status },
        });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: `bad request. Error: ${error}` });
    }
});
exports.updateTask = updateTask;
const deleteTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    try {
        const task = yield prisma.task.delete({
            where: { id: taskId },
        });
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ message: `bad request. Error: ${error}` });
    }
});
exports.deleteTasks = deleteTasks;
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const body = req.body;
    try {
        const tasks = yield prisma.task.update({
            where: { id: taskId },
            data: body,
        });
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: `bad request. Error: ${error}` });
    }
});
exports.editTask = editTask;
const assignTaskToProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, taskId } = req.body;
    try {
        const team = yield prisma.task.update({
            where: { id: taskId },
            data: { projectId: projectId },
        });
        return res.json({ suc: true });
    }
    catch (error) {
        return res.json({ suc: false });
    }
});
exports.assignTaskToProject = assignTaskToProject;
const removeTaskFromProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.body;
    try {
        const team = yield prisma.task.update({
            where: { id: taskId },
            data: { projectId: null },
        });
        return res.json({ suc: true });
    }
    catch (error) {
        return res.json({ suc: false });
    }
});
exports.removeTaskFromProject = removeTaskFromProject;
