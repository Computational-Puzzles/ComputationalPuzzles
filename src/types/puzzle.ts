export type PuzzleInputProps = {
  type: 'TEXT' | 'MCQ';
  placeholder?: string;
  options?: string[];
  setAnswer: (value) => void;
};
