import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getPuzzleInstanceHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { puzzleInstanceId, verbose } = req.query as {
    puzzleInstanceId: string;
    verbose: string;
  };

  const verboseBool = verbose.toLowerCase() === 'true';

  if (!puzzleInstanceId) {
    return res.status(400).json({
      message: 'Please provide a puzzle instance id.'
    });
  }

  try {
    let puzzleInstance;
    if (verboseBool) {
      puzzleInstance = await prisma.puzzleInstance.findUnique({
        where: {
          id: +puzzleInstanceId
        },
        include: {
          puzzle: {
            include: {
              puzzleType: true
            }
          }
        }
      });
    } else {
      puzzleInstance = await prisma.puzzleInstance.findUnique({
        where: {
          id: +puzzleInstanceId
        }
      });
    }
    return res.status(200).json({
      puzzleInstance
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export default getPuzzleInstanceHandler;
