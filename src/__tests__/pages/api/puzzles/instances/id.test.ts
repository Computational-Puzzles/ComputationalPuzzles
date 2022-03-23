import { NextApiRequest, NextApiResponse } from 'next';
import getPuzzleInstanceHandler from '../../../../../pages/api/puzzles/instances/[instanceId]';
import { mockPuzzleInstance } from '../../../../../__mocks__/pages/api/puzzles';

import { prisma } from '../../../../../__mocks__';

beforeEach(async () => {
  await prisma.puzzleInstance.deleteMany({});
  await prisma.puzzle.deleteMany({});
  await prisma.puzzleType.deleteMany({});
});

describe('/api/puzzles/instances/[instanceId]: Succeeded', () => {
  it('sucessfully retrieves puzzle instance', async () => {
    const puzzleInstance = await mockPuzzleInstance();
    const json = jest.fn();
    const status = jest.fn(() => {
      return { json };
    });
    const res = {
      status
    } as unknown as NextApiResponse;

    const req = {
      query: {
        instanceId: puzzleInstance.id,
        verbose: 'true'
      }
    } as unknown as NextApiRequest;

    await getPuzzleInstanceHandler(req, res);

    expect(json).toHaveBeenNthCalledWith(1, {
      puzzleInstance: expect.objectContaining({
        ...puzzleInstance
      })
    });
  });
});

// TODO: Create failed tests
