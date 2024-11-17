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
exports.removeTeamFromProject = exports.assignTeamToProject = exports.deleteProject = exports.createProject = exports.getProjectsWithTasks = exports.getProjects = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield prisma.project.findMany();
        const projectWithTeams = yield Promise.all(projects.map((project) => __awaiter(void 0, void 0, void 0, function* () {
            if (project.teamId) {
                const team = yield prisma.team.findUnique({
                    where: { id: project.teamId },
                });
                return Object.assign(Object.assign({}, project), { teamName: team === null || team === void 0 ? void 0 : team.teamName });
            }
            return Object.assign(Object.assign({}, project), { teamName: "" });
        })));
        res.json(projectWithTeams);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `failed to retrieve the projects. ${error}` });
    }
});
exports.getProjects = getProjects;
const getProjectsWithTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield prisma.project.findMany({
            include: { tasks: true },
        });
        if (projects)
            res.json(projects);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `failed to retrieve the projects. ${error}` });
    }
});
exports.getProjectsWithTasks = getProjectsWithTasks;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const newProject = yield prisma.project.create({
            data,
        });
        res.status(201).json(newProject);
    }
    catch (error) {
        res.status(500).json({ message: `Failed to create projects. ${error}` });
    }
});
exports.createProject = createProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.params;
    try {
        const project = yield prisma.project.delete({
            where: { id: projectId },
        });
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ message: `Failed to delete projects. ${error}` });
    }
});
exports.deleteProject = deleteProject;
const assignTeamToProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, teamId } = req.body;
    try {
        const team = yield prisma.project.update({
            where: { id: projectId },
            data: { teamId: teamId },
        });
        return res.json({ suc: true });
    }
    catch (error) {
        return res.json({ suc: false });
    }
});
exports.assignTeamToProject = assignTeamToProject;
const removeTeamFromProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId } = req.body;
    try {
        const team = yield prisma.project.update({
            where: { id: projectId },
            data: { teamId: null },
        });
        return res.json({ suc: true });
    }
    catch (error) {
        return res.json({ suc: false });
    }
});
exports.removeTeamFromProject = removeTeamFromProject;
