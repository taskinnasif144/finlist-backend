import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    const projectWithTeams = await Promise.all(
      projects.map(async (project) => {
        if (project.teamId) {
          const team = await prisma.team.findUnique({
            where: { id: project.teamId },
          });
          return { ...project, teamName: team?.teamName };
        }
        return { ...project, teamName: "" };
      })
    );
    res.json(projectWithTeams);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `failed to retrieve the projects. ${error}` });
  }
};
export const getProjectsWithTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany({
      include: { tasks: true },
    });
    if (projects) res.json(projects);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `failed to retrieve the projects. ${error}` });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.body;

  try {
    const newProject = await prisma.project.create({
      data,
    });
    res.status(201).json(newProject);
  } catch (error: any) {
    res.status(500).json({ message: `Failed to create projects. ${error}` });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  try {
    const project = await prisma.project.delete({
      where: { id: projectId },
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: `Failed to delete projects. ${error}` });
  }
};

export const assignTeamToProject = async (req: Request, res: Response) => {
  const { projectId, teamId } = req.body;

  try {
    const team = await prisma.project.update({
      where: { id: projectId },
      data: { teamId: teamId },
    });
    return res.json({ suc: true });
  } catch (error: any) {
    return res.json({ suc: false });
  }
};
export const removeTeamFromProject = async (req: Request, res: Response) => {
  const { projectId } = req.body;
  try {
    const team = await prisma.project.update({
      where: { id: projectId },
      data: { teamId: null },
    });
    return res.json({ suc: true });
  } catch (error: any) {
    return res.json({ suc: false });
  }
};
