import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const listAllPuzzleInstancesHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const puzzleInstances = await prisma.puzzleInstance.findMany();
    return res.status(200).json({
      puzzleInstances
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export default listAllPuzzleInstancesHandler;
