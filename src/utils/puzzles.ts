import axios from 'axios';
import { Puzzle, PuzzleInstance } from '@prisma/client';
import { User } from 'next-auth';
import type { puzzleSubmissionProps } from '../types/api/puzzles/submission';

const submitPuzzleInstance = async (
  answer: string,
  puzzleInstance: PuzzleInstance,
  puzzle: Puzzle,
  randomSeed: number,
  user: User
) => {
  const puzzleSubmissionDetails = {
    answer: answer,
    puzzleInstanceId: puzzleInstance.id,
    puzzleId: puzzle.id,
    randomSeed: randomSeed,
    userEmail: user.email
  } as puzzleSubmissionProps;

  axios.post('/api/puzzles/instances/submit', puzzleSubmissionDetails).then(
    response => {
      console.log(response.status);
      alert(response.data.message);
    },
    error => {
      // TODO: proper alerts
      console.log(error);
      console.log(error.status);
      alert('Oh no - errors.');
    }
  );
};

const checkPuzzleAnswer = (
  puzzle: Puzzle,
  randomSeed: number,
  puzzleAnswer: string
) => {
  const trueAnswer = puzzle.variables['answer'];
  if (!trueAnswer) return false;
  return trueAnswer === puzzleAnswer;
};

export { submitPuzzleInstance, checkPuzzleAnswer };
