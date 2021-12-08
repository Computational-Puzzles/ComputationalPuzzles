import Axios from './axios';

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
    return null;
  }
  return null;
};

export { getPuzzleInstance };
