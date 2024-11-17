import { Router } from "express";
import {
  createTeam,
  deleteTeam,
  getTeams,
} from "../controllers/TeamController";

const router = Router();

router.get("/", getTeams);
router.post("/create", createTeam);
router.delete("/delete/:teamId", deleteTeam);

export default router;
