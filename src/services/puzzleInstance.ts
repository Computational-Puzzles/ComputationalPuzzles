import Axios from './axios';
import { Puzzle, PuzzleInstance } from '@prisma/client';
import { User } from 'next-auth';
import { puzzleSubmissionProps } from '../types/api/puzzles/submission';
import { handleServiceError } from '../utils/error';

const getPuzzleInstance = async (
  puzzleInstanceId: number,
  verbose: boolean
) => {
  puzzleInstanceId = Math.floor(puzzleInstanceId);

  try {
    const res = await Axios.get(
      `api/puzzles/instances/${puzzleInstanceId}?verbose=${verbose}`
    );
    if (res.status === 200) {
      return res.data.puzzleInstance;
    }
  } catch (error) {
    return handleServiceError(
      error.response.status,
      error.response.data.message
    );
  }
};

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

  try {
    const res = await Axios.post(
      '/api/puzzles/instances/submit',
      puzzleSubmissionDetails
    );
    if (res.status === 200) {
      return res.data.submission;
    }
  } catch (error) {
    return handleServiceError(
      error.response.status,
      error.response.data.message
    );
  }
};

export { getPuzzleInstance, submitPuzzleInstance };
