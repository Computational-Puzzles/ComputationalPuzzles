import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const listAllSubmissions = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const puzzles = await prisma.submission.findMany();
    return res.status(200).json(puzzles);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export default listAllSubmissions;
