import { Router } from "express";
import {
  assignUserToTeam,
  createUser,
  getUsers,
  getUsersbyId,
  loginUser,
  removeUserFromTeam,
} from "../controllers/userConroller";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUsersbyId);
router.post("/create", createUser);
router.post("/login", loginUser);
router.patch("/assign-team-user", assignUserToTeam);
router.patch("/remove-team-user", removeUserFromTeam);

export default router;
