import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const listAllPuzzleInstancesHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { verbose } = req.query as {
      verbose: string;
    };
    const isVerbose = verbose.toLowerCase() === 'true';

    const puzzleInstances = await prisma.puzzleInstance.findMany({
      include: isVerbose
        ? {
            puzzle: {
              include: {
                puzzleType: true
              }
            }
          }
        : undefined
    });

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
