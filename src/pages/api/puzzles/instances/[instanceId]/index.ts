import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const getPuzzleInstanceHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { instanceId, verbose } = req.query as {
    instanceId: string;
    verbose: string;
  };

  const verboseBool = (/true/i).test(verbose.toLowerCase());

  if (!instanceId) {
    return res.status(400).json({
      message: 'Please provide a puzzle instance id.'
    });
  }

  try {
    let puzzleInstance;
    if (verboseBool) {
      puzzleInstance = await prisma.puzzleInstance.findUnique({
        where: {
          id: +instanceId
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
          id: +instanceId
        }
      });
    }

    if (puzzleInstance) {
      return res.status(200).json({
        puzzleInstance
      });
    } else {
      return res.status(404).json({
        message: `PuzzleInstance(${instanceId}) could not be found.`
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

export default getPuzzleInstanceHandler;
