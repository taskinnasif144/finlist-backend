"use strict";
// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// export const getProjects = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const projects = await prisma.project.findMany();
//     if (projects) res.json(projects);
//   } catch (error: any) {
//     res
//       .status(500)
//       .json({ message: `failed to retrieve the projects. ${error}` });
//   }
// };
// export const getProjectsWithTasks = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const projects = await prisma.project.findMany({
//       include: { tasks: true },
//     });
//     if (projects) res.json(projects);
//   } catch (error: any) {
//     res
//       .status(500)
//       .json({ message: `failed to retrieve the projects. ${error}` });
//   }
// };
// export const createProject = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const data = req.body;
//   try {
//     const newProject = await prisma.project.create({
//       data,
//     });
//     res.status(201).json(newProject);
//   } catch (error: any) {
//     res.status(500).json({ message: `Failed to create projects. ${error}` });
//   }
// };
// export const deleteProject = async (req: Request, res: Response) => {
//   const { projectId } = req.params;
//   try {
//     const project = await prisma.project.delete({
//       where: { id: Number(projectId) },
//     });
//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: `Failed to delete projects. ${error}` });
//   }
// };
