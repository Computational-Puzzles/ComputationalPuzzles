import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

type submitPuzzleProps = {
  puzzleAnswer: string;
  randomSeed: number;
  puzzleId: string;
  userEmail: string;
};

const prisma = new PrismaClient();

const checkPuzzleAnswer = (puzzle, randomSeed, puzzleAnswer: string) => {
  return puzzle.variables.answer === puzzleAnswer;
};

const submitPuzzleHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { puzzleAnswer, randomSeed, puzzleId, userEmail } = req.body as submitPuzzleProps;
  if (!userEmail || !randomSeed || !puzzleId || !puzzleAnswer ) {
    res.status(400).json({
      message: 'User email, puzzle answer, and puzzle id are required!'
    });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail
    }
  });

  if (!user) {
    res.status(400).json({
      message: 'User not found.'
    });
    return;
  }

  const puzzle = await prisma.puzzle.findUnique({
    where: {
      id: +puzzleId
    }
  });

  if (!puzzle) {
    res.status(400).json({
      message: 'Puzzle not found.'
    });
    return;
  }

  const isCorrect = checkPuzzleAnswer(puzzle, randomSeed, puzzleAnswer);
  await prisma.submission.create({
    data: {
      puzzleId: puzzle.id,
      userId: user.id,
      answers: [puzzleAnswer],
      isCorrect: [isCorrect],
      randomSeed: [+randomSeed]
    }
  });

  res.redirect(302, `/puzzles/${puzzle.id}`);
};

export default submitPuzzleHandler;


