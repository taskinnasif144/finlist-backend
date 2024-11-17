import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await prisma.team.findMany({
      include: {
        projects: true,
      },
    });

    res.json(teams);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  const { teamName } = req.body;
  try {
    const teams = await prisma.team.create({
      data: { teamName },
    });

    return res.json(teams);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const project = await prisma.project.findFirst({
      where: { teamId: teamId },
    });

    if (project) {
      const updateProject = await prisma.project.update({
        where: { id: project?.id },
        data: { teamId: null },
      });
    }

    const team = await prisma.team.delete({
      where: { id: teamId },
    });

    return res.json(team);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: `Error deleting team: ${error.message}` });
  }
};
