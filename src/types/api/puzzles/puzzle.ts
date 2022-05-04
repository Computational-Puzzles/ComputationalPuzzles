import type { Puzzle, PuzzleType } from '@prisma/client';

export type PuzzleCustom = Puzzle & {
  puzzleType?: PuzzleType;
};
