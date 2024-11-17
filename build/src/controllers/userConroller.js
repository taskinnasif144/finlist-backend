"use strict";
// import { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// export const getUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await prisma.user.findMany();
//     const usersWithTeamNames = await Promise.all(
//       users.map(async (user: any) => {
//         const team = await prisma.team.findUnique({
//           where: { id: user.teamId },
//           select: { teamName: true },
//         });
//         return {
//           ...user,
//           teamName: team?.teamName,
//         };
//       })
//     );
//     res.json(usersWithTeamNames);
//   } catch (error: any) {
//     res
//       .status(500)
//       .json({ message: `Error retrieving users: ${error.message}` });
//   }
// };
