import { DIFFICULTY } from '../types/global';

const difficultySentenceCase = (difficulty: DIFFICULTY) => {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
};

export { difficultySentenceCase };
