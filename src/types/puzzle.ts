import {PuzzleInstance} from "./mapRenderer";

export type PuzzleInputProps = {
  type: 'TEXT' | 'MCQ';
  placeholder?: string;
  options?: string[];
  setAnswer: (value) => void;
};

export type PuzzleMapProps = {
  puzzleInstances: PuzzleInstance[];
};