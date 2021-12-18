import { DIFFICULTY } from './global';

import { ButtonAction } from './button';

export type CARD_TYPE = 'list' | 'grid';
export type CardProps = {
  name: string;
  content: string[];
  difficulty: DIFFICULTY;
  type?: CARD_TYPE;
  buttonActions?: ButtonAction[];
};
