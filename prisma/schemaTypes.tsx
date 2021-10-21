export type PuzzleProps = {
  id: number;
  name: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  content: string;
  imageUrl: string;
  exampleContent: string;
  exampleImageUrl: string;
  isGenerated: string;
  question: string;
  hint: string;
  inputType: string;
  published: boolean;
  variables: {
    options: string[];
  };
  puzzleTypeId: number;
};
