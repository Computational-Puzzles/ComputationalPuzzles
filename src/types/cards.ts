import type { Difficulty } from '@prisma/client';

import { ButtonAction } from './button';

export type CARD_TYPE = 'list' | 'grid';
export type CardProps = {
  name: string;
  content: string[];
  difficulty: Difficulty;
  type?: CARD_TYPE;
  buttonActions?: ButtonAction[];
};
