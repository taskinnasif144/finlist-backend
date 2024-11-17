"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
// Route Imports
const userRoutes_1 = __importDefault(require("./routers/userRoutes"));
const projectRoutes_1 = __importDefault(require("./routers/projectRoutes"));
const taskRoutes_1 = __importDefault(require("./routers/taskRoutes"));
const searchRoutes_1 = __importDefault(require("./routers/searchRoutes"));
const teamRouter_1 = __importDefault(require("./routers/teamRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.get("/test", (req, res) => {
    res.json("working");
});
app.use("/users", userRoutes_1.default);
app.use("/projects", projectRoutes_1.default);
app.use("/tasks", taskRoutes_1.default);
app.use("/search", searchRoutes_1.default);
app.use("/teams", teamRouter_1.default);
const port = process.env.PORT;
const url = process.env.DATABASE_URL;
mongoose_1.default
    .connect(process.env.DATABASE_URL)
    .then(() => app.listen(port))
    .then(() => console.log("Server connected and database is also connected"))
    .catch((err) => console.error(err));
