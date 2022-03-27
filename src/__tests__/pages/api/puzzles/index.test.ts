import { NextApiRequest, NextApiResponse } from 'next';
import listAllPuzzles from '../../../../pages/api/puzzles';
import { prisma } from '../../../../__mocks__';
import { mockPuzzle } from '../../../../__mocks__/pages/api/puzzles';

beforeEach(async () => {
  await prisma.puzzleInstance.deleteMany({});
  await prisma.puzzle.deleteMany({});
  await prisma.puzzleType.deleteMany({});
});

describe('/api/puzzles: Succeeded', () => {
  it('sucessfully retrieves all puzzles', async () => {
    const numPuzzles = Math.floor(Math.random() * 20) + 1;
    const createMulitplePuzzlePromises = [];

    for (let i = 0; i < numPuzzles; ++i) {
      createMulitplePuzzlePromises.push(mockPuzzle());
    }
    const puzzles = await Promise.all(createMulitplePuzzlePromises);

    const json = jest.fn();
    const status = jest.fn(() => {
      return { json };
    });
    const res = {
      status
    } as unknown as NextApiResponse;
    const req = {} as unknown as NextApiRequest;

    await listAllPuzzles(req, res);

    expect(json).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenNthCalledWith(1, 200);
    puzzles.forEach(puzzle => {
      expect(json).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            ...puzzle
          })
        ])
      );
    });
    expect(json.mock.calls[0][0].length).toBe(numPuzzles);
  });
});
