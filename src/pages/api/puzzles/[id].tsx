import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getPuzzleById = async (req: NextApiRequest, res: NextApiResponse) => {
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
};

export default getPuzzleById;
