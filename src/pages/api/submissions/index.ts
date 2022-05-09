import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const listAllSubmissions = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const submissions = await prisma.submission.findMany();
    return res.status(200).json(submissions);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export default listAllSubmissions;
