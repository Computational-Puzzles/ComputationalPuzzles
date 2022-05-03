import { Difficulty } from '@prisma/client';

export type RadioButtonProps = {
  id: string;
  name: string;
  difficulty: Difficulty;
  onClick?: () => void;
};
