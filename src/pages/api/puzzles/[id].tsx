import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const puzzle = await prisma.puzzle.findUnique({
      where: {
        id: Number(id)
      }
    });
    res.status(200).json(puzzle);
  } catch (err) {
    res.status(500).json({ error: 'Unable to find puzzle with ID' });
  }
}
