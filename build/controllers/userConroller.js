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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersbyId = exports.getUsers = exports.removeUserFromTeam = exports.assignUserToTeam = exports.loginUser = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, username } = req.body;
    console.log(email);
    try {
        const user = yield prisma.user.findMany({
            where: { email: email },
        });
        if (user.length != 0)
            return res.json({ message: "Already Exists", status: false });
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });
        if (newUser)
            return res.json({ message: "User Created", status: true });
        return res.json({ message: "Something wennt wrong", status: false });
    }
    catch (error) {
        res.status(500).json({ message: error, status: false });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email);
    try {
        const user = yield prisma.user.findUnique({
            where: { email: email },
        });
        if (!user)
            return res.json({
                message: "User Not Found! Please Sign up",
                status: false,
            });
        // compare password
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (validPassword) {
            // generate token as cookies
            const secret = process.env.SECRET_KEY;
            const token = jsonwebtoken_1.default.sign({ email: email, id: user.id }, secret);
            const options = {
                httpOnly: true,
                secure: true,
            };
            return res
                .cookie("access_token", token, options)
                .json({ message: "User Authenticated", status: true });
        }
        else {
            return res.json({
                message: "Credentials dont match, please try again",
                status: false,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Error retrieving users: ${error.message}`,
            status: false,
        });
    }
});
exports.loginUser = loginUser;
const assignUserToTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamId, userId } = req.body;
    try {
        const user = yield prisma.user.update({
            where: { id: userId },
            data: { teamId: teamId },
        });
        return res.json({ suc: true });
    }
    catch (error) {
        res.status(500).json({ suc: false });
    }
});
exports.assignUserToTeam = assignUserToTeam;
const removeUserFromTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    try {
        const user = yield prisma.user.update({
            where: { id: userId },
            data: { teamId: null },
        });
        return res.json({ suc: true });
    }
    catch (error) {
        res.status(500).json({ suc: false });
    }
});
exports.removeUserFromTeam = removeUserFromTeam;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        const usersWithTeam = yield Promise.all(users.map((user) => __awaiter(void 0, void 0, void 0, function* () {
            if (user.teamId) {
                const team = yield prisma.team.findUnique({
                    where: { id: user.teamId },
                });
                return Object.assign(Object.assign({}, user), { teamName: team === null || team === void 0 ? void 0 : team.teamName });
            }
            return Object.assign(Object.assign({}, user), { teamName: "" });
        })));
        return res.json(usersWithTeam);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `Error retrieving users: ${error.message}` });
    }
});
exports.getUsers = getUsers;
const getUsersbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const users = yield prisma.user.findUnique({
            where: { id: userId },
        });
        return res.json(users);
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: `Error retrieving users: ${error.message}` });
    }
});
exports.getUsersbyId = getUsersbyId;
