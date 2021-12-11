import Axios from './axios';
import { Puzzle, PuzzleInstance } from '@prisma/client';
import { User } from 'next-auth';
import { puzzleSubmissionProps } from '../types/api/puzzles/submission';
import axios from 'axios';

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
    return handleError(error.response.status, error.response.data.message);
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
    const res = await axios.post(
      '/api/puzzles/instances/submit',
      puzzleSubmissionDetails
    );
    if (res.status === 200) {
      return res.data.submission;
    }
  } catch (error) {
    return handleError(error.response.status, error.response.data.message);
  }
};

const handleError = (status, message) => {
  if (status === 404) {
    return {
      name: '404',
      message: message || 'Not Found.'
    } as Error;
  } else {
    return {
      name: '500',
      message: message || 'Server Error.'
    } as Error;
  }
};

export { getPuzzleInstance, submitPuzzleInstance };
