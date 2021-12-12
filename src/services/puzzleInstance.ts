import Axios from './axios';
import { PuzzleInstance } from '@prisma/client';

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
    if (error.response.status === 404) {
      return {
        name: '404',
        message: error.response.data.message
      } as Error;
    } else {
      return {
        name: '500',
        message: error.response.data.message
      } as Error;
    }
  }
};

const createPuzzleInstance = async (
  puzzleId: number,
  longitude: number,
  latitude: number,
  address: string,
  hint?: string
) => {
  const createPuzzleInstanceData = {
    puzzleId,
    longitude,
    latitude,
    address,
    hint
  } as PuzzleInstance;

  try {
    const res = await Axios.post(
      `api/puzzles/instances/create`,
      createPuzzleInstanceData
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    return {
      name: '500',
      message: error.response.data.message
    } as Error;
  }
};

export { getPuzzleInstance, createPuzzleInstance };
