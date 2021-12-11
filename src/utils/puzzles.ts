import { Puzzle } from '@prisma/client';

const checkPuzzleAnswer = (
  puzzle: Puzzle,
  randomSeed: number,
  puzzleAnswer: string
) => {
  const trueAnswer = puzzle.variables['answer'];
  if (!trueAnswer) return false;
  return trueAnswer === puzzleAnswer;
};

export { checkPuzzleAnswer };
