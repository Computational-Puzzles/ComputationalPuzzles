import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const listAllPuzzles = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const puzzles = await prisma.puzzle.findMany();
    return res.status(200).json(puzzles);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export default listAllPuzzles;
