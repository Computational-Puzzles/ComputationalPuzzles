import { NextApiRequest, NextApiResponse } from 'next';
import getPuzzleById from '../../../../pages/api/puzzles/[id]';
import { prisma } from '../../../../__mocks__';
import { mockPuzzle } from '../../../../__mocks__/pages/api/puzzles';

beforeEach(async () => {
  await prisma.puzzleInstance.deleteMany({});
  await prisma.puzzle.deleteMany({});
  await prisma.puzzleType.deleteMany({});
});

describe('/api/puzzles/[id]: Succeeded', () => {
   it('sucessfully retrieves puzzle', async () => {
      const newPuzzle = await mockPuzzle();
      const json = jest.fn();
      const status = jest.fn(() => {
         return { json };
      });
      const res = {
         status
      } as unknown as NextApiResponse;

      const req = {
         query: {
            id: newPuzzle.id,
         }
      } as unknown as NextApiRequest;

      await getPuzzleById(req, res);

      expect(json).toHaveBeenNthCalledWith(1, newPuzzle);
      expect(status).toHaveBeenNthCalledWith(1, 200);
   });
});

// TODO: Create failed tests
