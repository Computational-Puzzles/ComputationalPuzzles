export type PuzzleProps = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  content: string;
  imageUrl: string;
  exampleContent: string;
  exampleImageUrl: string;
  isGenerated: boolean;
  question: string;
  hint: string;
  inputType: 'TEXT' | 'MCQ';
  published: boolean;
  variables: {
    options?: string[];
    answer: string;
  };
  puzzleTypeId: number;
  puzzleType?: PuzzleTypeProps;
};

export type PuzzleTypeProps = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
