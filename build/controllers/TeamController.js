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
exports.deleteTeam = exports.createTeam = exports.getTeams = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield prisma.team.findMany({
            include: {
                projects: true,
            },
        });
        res.json(teams);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving users: ${error.message}` });
    }
});
exports.getTeams = getTeams;
const createTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamName } = req.body;
    try {
        const teams = yield prisma.team.create({
            data: { teamName },
        });
        return res.json(teams);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `Error retrieving users: ${error.message}` });
    }
});
exports.createTeam = createTeam;
const deleteTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamId } = req.params;
    try {
        const project = yield prisma.project.findFirst({
            where: { teamId: teamId },
        });
        if (project) {
            const updateProject = yield prisma.project.update({
                where: { id: project === null || project === void 0 ? void 0 : project.id },
                data: { teamId: null },
            });
        }
        const team = yield prisma.team.delete({
            where: { id: teamId },
        });
        return res.json(team);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `Error deleting team: ${error.message}` });
    }
});
exports.deleteTeam = deleteTeam;
