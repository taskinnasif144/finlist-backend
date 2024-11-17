import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { email, password, username } = req.body;
  console.log(email);

  try {
    const user = await prisma.user.findMany({
      where: { email: email },
    });

    if (user.length != 0)
      return res.json({ message: "Already Exists", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    if (newUser) return res.json({ message: "User Created", status: true });

    return res.json({ message: "Something wennt wrong", status: false });
  } catch (error: any) {
    res.status(500).json({ message: error, status: false });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user)
      return res.json({
        message: "User Not Found! Please Sign up",
        status: false,
      });

    // compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      // generate token as cookies
      const secret = process.env.SECRET_KEY;
      const token = jwt.sign({ email: email, id: user.id }, secret!);
      const options = {
        httpOnly: true,
        secure: true,
      };

      return res
        .cookie("access_token", token, options)
        .json({ message: "User Authenticated", status: true });
    } else {
      return res.json({
        message: "Credentials dont match, please try again",
        status: false,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: `Error retrieving users: ${error.message}`,
      status: false,
    });
  }
};
export const assignUserToTeam = async (req: Request, res: Response) => {
  const { teamId, userId } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { teamId: teamId },
    });
    return res.json({ suc: true });
  } catch (error: any) {
    res.status(500).json({ suc: false });
  }
};
export const removeUserFromTeam = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { teamId: null },
    });
    return res.json({ suc: true });
  } catch (error: any) {
    res.status(500).json({ suc: false });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    const usersWithTeam = await Promise.all(
      users.map(async (user) => {
        if (user.teamId) {
          const team = await prisma.team.findUnique({
            where: { id: user.teamId! },
          });
          return { ...user, teamName: team?.teamName };
        }
        return { ...user, teamName: "" };
      })
    );

    return res.json(usersWithTeam);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};
export const getUsersbyId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const users = await prisma.user.findUnique({
      where: { id: userId },
    });

    return res.json(users);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};
