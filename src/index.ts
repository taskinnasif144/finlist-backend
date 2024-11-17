import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";

// Route Imports
import UserRouter from "./routers/userRoutes";
import ProjectRouter from "./routers/projectRoutes";
import TaskRouter from "./routers/taskRoutes";
import SearchRouter from "./routers/searchRoutes";
import TeamRouter from "./routers/teamRouter";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.get("/test", (req, res) => {
  res.json("working");
});

app.use("/users", UserRouter);
app.use("/projects", ProjectRouter);
app.use("/tasks", TaskRouter);
app.use("/search", SearchRouter);
app.use("/teams", TeamRouter);

const port = process.env.PORT;
const url = process.env.DATABASE_URL;

mongoose
  .connect(process.env.DATABASE_URL!)
  .then(() => app.listen(port))
  .then(() => console.log("Server connected and database is also connected"))
  .catch((err) => console.error(err));
