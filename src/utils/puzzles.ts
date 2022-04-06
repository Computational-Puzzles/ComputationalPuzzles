import { Puzzle } from '@prisma/client';

const checkPuzzleAnswer = (
  puzzle: Puzzle,
  randomSeed: number,
  puzzleAnswer: string
) => {
  const trueAnswer = puzzle.variables['answer'];
  console.log("in the checkPuzzleAnswer function, the accessed ans = " + trueAnswer);
  if (!trueAnswer) return false;
  return trueAnswer === puzzleAnswer;
};

export { checkPuzzleAnswer };
