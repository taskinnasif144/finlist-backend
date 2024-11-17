"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TeamController_1 = require("../controllers/TeamController");
const router = (0, express_1.Router)();
router.get("/", TeamController_1.getTeams);
router.post("/create", TeamController_1.createTeam);
router.delete("/delete/:teamId", TeamController_1.deleteTeam);
exports.default = router;
