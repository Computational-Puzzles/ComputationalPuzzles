import { PuzzleInstance } from '@prisma/client';
import { PuzzleCustom } from '../puzzle';

export type PuzzleInstanceCustom = PuzzleInstance & {
  puzzle: PuzzleCustom;
};
