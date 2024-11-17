import { Router } from "express";
import {
  assignTeamToProject,
  createProject,
  deleteProject,
  getProjects,
  getProjectsWithTasks,
  removeTeamFromProject,
} from "../controllers/projectControllers";

const router = Router();

router.get("/", getProjects);
router.get("/tasks", getProjectsWithTasks);
router.post("/create", createProject);
router.delete("/delete/:projectId", deleteProject);
router.patch("/assign-team-project", assignTeamToProject);
router.patch("/remove-team-project", removeTeamFromProject);

export default router;
