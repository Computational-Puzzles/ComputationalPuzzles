import { Difficulty } from "@prisma/client";

const difficultySentenceCase = (difficulty: Difficulty) => {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
};

export { difficultySentenceCase };
