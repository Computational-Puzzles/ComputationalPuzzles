import { NextApiRequest, NextApiResponse } from 'next';
import listAllPuzzleInstancesHandler from '../../../../../pages/api/puzzles/instances';
import { prisma } from '../../../../../__mocks__';
import { mockPuzzleInstance } from '../../../../../__mocks__/pages/api/puzzles';

beforeEach(async () => {
  await prisma.puzzleInstance.deleteMany({});
  await prisma.puzzle.deleteMany({});
  await prisma.puzzleType.deleteMany({});
});

describe('/api/puzzles/instances', () => {
  it('sucessfully retrieves puzzle instances', async () => {
    const createMulitplePuzzleInstancePromises = [];
    const numPuzzleInstances = Math.floor(Math.random() * 20) + 1;

    for (let i = 0; i < numPuzzleInstances; ++i) {
      createMulitplePuzzleInstancePromises.push(mockPuzzleInstance());
    }
    const puzzleInstances = await Promise.all(
      createMulitplePuzzleInstancePromises
    );

    const json = jest.fn();
    const status = jest.fn(() => {
      return { json };
    });
    const res = {
      status
    } as unknown as NextApiResponse;
    const req = {
      query: {
        verbose: 'true'
      }
    } as unknown as NextApiRequest;

    await listAllPuzzleInstancesHandler(req, res);

    expect(json).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenNthCalledWith(1, 200);
    puzzleInstances.forEach(puzzleInstance => {
      expect(json).toHaveBeenCalledWith({
        puzzleInstances: expect.arrayContaining([
          expect.objectContaining({
            ...puzzleInstance
          })
        ])
      });
    });
    expect(json.mock.calls[0][0].puzzleInstances.length).toEqual(numPuzzleInstances);
  });
});

// TODO: Create failed tests
