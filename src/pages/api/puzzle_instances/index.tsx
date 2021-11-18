import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const puzzleInstances = await prisma.puzzleInstance.findMany();
  res.status(200).json(puzzleInstances);
}
