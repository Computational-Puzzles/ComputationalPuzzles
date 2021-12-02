import { ButtonAction } from './button';

export type DIFFICULTY = 'HARD' | 'MEDIUM' | 'EASY';
export type CARD_TYPE = 'list' | 'grid';
export type CardProps = {
  name: string;
  content: string;
  difficulty: DIFFICULTY;
  type?: CARD_TYPE;
  buttonActions?: ButtonAction[];
};
