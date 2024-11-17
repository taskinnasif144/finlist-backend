import { Router } from "express";
import {
  assignTaskToProject,
  createTasks,
  deleteTasks,
  getAllTasks,
  getTasks,
  removeTaskFromProject,
  updateTask,
} from "../controllers/taskController";

const router = Router();

router.get("/", getAllTasks);
router.get("/:projectId", getTasks);
router.post("/create", createTasks);
router.patch("/:taskId/status", updateTask);
router.delete("/delete/:taskId", deleteTasks);
router.delete("/edit/:taskId", deleteTasks);
router.patch("/assign-task-project", assignTaskToProject);
router.patch("/remove-task-project", removeTaskFromProject);

export default router;
