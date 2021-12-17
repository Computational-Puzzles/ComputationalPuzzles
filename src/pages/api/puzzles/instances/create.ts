import { PrismaClient, PuzzleInstance } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const createPuzzleHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { puzzleId, hint, longitude, latitude, address } =
    req.body as PuzzleInstance;

  if (!puzzleId || !longitude || !latitude || !address) {
    return res.status(400).json({
      message: 'Longitude, latitude, address, and puzzle id are required!'
    });
  }

  const puzzle = await prisma.puzzle.findUnique({
    where: {
      id: +puzzleId
    }
  });

  if (!puzzle) {
    return res.status(404).json({
      message: 'Puzzle not found.'
    });
  }

  const puzzleInstance = await prisma.puzzleInstance.create({
    data: {
      puzzleId: +puzzleId,
      hint: hint || 'No Hint',
      longitude: +longitude,
      latitude: +latitude,
      address
    }
  });

  return res.status(200).json({
    message: 'PuzzleInstance generated successfully',
    puzzleInstance: puzzleInstance
  });
};

export default createPuzzleHandler;
