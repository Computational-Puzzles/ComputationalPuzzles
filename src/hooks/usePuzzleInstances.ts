import useSWR from 'swr';
import { fetcher } from '../utils/swr';

const usePuzzleInstances = (verbose: boolean) => {
  const { data, error } = useSWR(
    `api/puzzles/instances?verbose=${verbose}`,
    fetcher
  );

  return {
    puzzleInstances: data && data.puzzleInstances,
    loadingPuzzleInstances: !error && !data,
    errorPuzzleInstances: error
  };
};

export { usePuzzleInstances };
