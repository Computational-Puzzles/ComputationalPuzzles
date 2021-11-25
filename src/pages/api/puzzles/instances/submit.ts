import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  checkPuzzleAnswer,
  puzzleSubmissionProps
} from '../../../../utils/puzzles';

const prisma = new PrismaClient();

const submitPuzzleHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { answer, puzzleInstanceId, puzzleId, randomSeed, userEmail } =
    req.body as puzzleSubmissionProps;

  // const { puzzleAnswer, randomSeed, puzzleId, userEmail } = req.body as submitPuzzleProps;
  if (!userEmail || !randomSeed || !puzzleId || !answer) {
    return res.status(400).json({
      message: 'User email, puzzle answer, and puzzle id are required!'
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail
    }
  });

  if (!user) {
    return res.status(400).json({
      message: 'User not found.'
    });
  }

  const puzzle = await prisma.puzzle.findUnique({
    where: {
      id: +puzzleId
    }
  });

  if (!puzzle) {
    return res.status(400).json({
      message: 'Puzzle not found.'
    });
  }

  const isCorrect = checkPuzzleAnswer(puzzle, randomSeed, answer);
  // const submission = await prisma.submission.create({
  //   data: {
  //     puzzleInstanceId: puzzleInstanceId,
  //     userId: user.id,
  //     answers: [answer],
  //     isCorrect: [isCorrect],
  //     randomSeed: [+randomSeed]
  //   }
  // });

  const submission = await prisma.submission.upsert({
    where: {
      puzzleInstanceId_userId: {
        puzzleInstanceId: puzzleInstanceId,
        userId: user.id
      }
    },
    update: {
      answers: {
        push: answer
      },
      isCorrect: {
        push: isCorrect
      },
      randomSeed: {
        push: randomSeed
      }
    },
    create: {
      puzzleInstanceId: puzzleInstanceId,
      userId: user.id,
      answers: [answer],
      isCorrect: [isCorrect],
      randomSeed: [+randomSeed]
    }
  });

  return res.status(200).json({
    message: 'Puzzle submitted successfully',
    submission: submission
  });
};

export default submitPuzzleHandler;


