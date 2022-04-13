const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getLinkToPuzzleInstance = (puzzleInstanceId: string | number) =>
  `${BASE_URL}/puzzles/${puzzleInstanceId}`;
