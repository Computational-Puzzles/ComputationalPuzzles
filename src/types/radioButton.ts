import { DIFFICULTY } from './global';

export type RadioButtonProps = {
  id: string;
  name: string;
  difficulty: DIFFICULTY;
  checked: boolean;
  onClick?: () => void;
};
