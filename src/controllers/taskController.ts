import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
import { readSync } from "fs";

const prisma = new PrismaClient();

export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany();
    const taskWithProjectName = await Promise.all(
      tasks.map(async (task) => {
        if (task.projectId) {
          const project = await prisma.project.findUnique({
            where: { id: task.projectId },
          });
          return { ...task, projectName: project?.name };
        }
        return { ...task };
      })
    );
    res.json(taskWithProjectName);
  } catch (error) {
    res.status(500).json({ message: `bad request. Error: ${error}` });
  }
};
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.params;

  if (projectId === "none") {
    res.json([]);
  } else {
    try {
      const tasks = await prisma.task.findMany({
        where: { projectId: projectId },
      });

      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: `bad request. Error: ${error}` });
    }
  }
};

export const createTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    projectId,
  } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        projectId,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: `Error creating Task: ${error}` });
  }
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const tasks = await prisma.task.update({
      where: { id: taskId },
      data: { status: status },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: `bad request. Error: ${error}` });
  }
};

export const deleteTasks = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  try {
    const task = await prisma.task.delete({
      where: { id: taskId },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: `bad request. Error: ${error}` });
  }
};

export const editTask = async (req: Request, res: Response): Promise<void> => {
  const { taskId } = req.params;
  const body = req.body;

  try {
    const tasks = await prisma.task.update({
      where: { id: taskId },
      data: body,
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: `bad request. Error: ${error}` });
  }
};

export const assignTaskToProject = async (req: Request, res: Response) => {
  const { projectId, taskId } = req.body;

  try {
    const team = await prisma.task.update({
      where: { id: taskId },
      data: { projectId: projectId },
    });
    return res.json({ suc: true });
  } catch (error: any) {
    return res.json({ suc: false });
  }
};
export const removeTaskFromProject = async (req: Request, res: Response) => {
  const { taskId } = req.body;
  try {
    const team = await prisma.task.update({
      where: { id: taskId },
      data: { projectId: null },
    });
    return res.json({ suc: true });
  } catch (error: any) {
    return res.json({ suc: false });
  }
};
