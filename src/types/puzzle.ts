import { PuzzleInstanceCustom } from './api/puzzles/instances/puzzleInstance';

export type PuzzleInputProps = {
  type: 'TEXT' | 'MCQ';
  placeholder?: string;
  options?: string[];
  answer: string;
  setAnswer: (value) => void;
};

export type PuzzleMapProps = {
  puzzleInstances: PuzzleInstanceCustom[];
};
