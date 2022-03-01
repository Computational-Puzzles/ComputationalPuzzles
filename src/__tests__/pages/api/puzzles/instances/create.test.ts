import { NextApiRequest, NextApiResponse } from 'next';
import {
  mockAdress,
  mockContent,
  mockHint,
  mockLatitude,
  mockLongtitude
} from '../../../../../__mocks__/pages/api/puzzles/instances/create';

import createPuzzleHandler from '../../../../../pages/api/puzzles/instances/create';
import { mockPuzzle } from '../../../../../__mocks__/pages/api/puzzles';

import { prisma } from '../../../../../__mocks__';

beforeEach(async () => {
  await prisma.puzzleInstance.deleteMany({});
  await prisma.puzzle.deleteMany({});
  await prisma.puzzleType.deleteMany({});
});

describe('/api/puzzles/instances/create: Succeeded', () => {
  it('sucessfully creates puzzle instance', async () => {
    const puzzle = await mockPuzzle();

    const json = jest.fn();
    const status = jest.fn(() => {
      return { json };
    });
    const res = {
      status
    } as unknown as NextApiResponse;

    const puzzleInstanceData = {
      puzzleId: puzzle.id,
      hint: mockHint(),
      longitude: mockLongtitude(),
      latitude: mockLatitude(),
      address: mockAdress()
    };

    const req = {
      body: {
        ...puzzleInstanceData
      }
    } as unknown as NextApiRequest;

    await createPuzzleHandler(req, res);

    expect(json).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        message: 'PuzzleInstance generated successfully',
        puzzleInstance: expect.objectContaining({
          ...puzzleInstanceData
        })
      })
    );
    expect(status).toHaveBeenNthCalledWith(1, 201);
  });

  it('sucessfully creates puzzle instance without hint', async () => {
    const puzzle = await mockPuzzle();

    const json = jest.fn();
    const status = jest.fn(() => {
      return { json };
    });
    const res = {
      status
    } as unknown as NextApiResponse;

    const puzzleInstanceData = {
      puzzleId: puzzle.id,
      longitude: mockLongtitude(),
      latitude: mockLatitude(),
      address: mockAdress()
    };

    const req = {
      body: {
        ...puzzleInstanceData
      }
    } as unknown as NextApiRequest;

    await createPuzzleHandler(req, res);

    expect(json).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        message: 'PuzzleInstance generated successfully',
        puzzleInstance: expect.objectContaining({
          ...puzzleInstanceData,
          hint: 'No Hint'
        })
      })
    );
    expect(status).toHaveBeenNthCalledWith(1, 201);
  });
});

describe('/api/puzzles/instances/create: Failed', () => {
  it('should return 404 error when there is no puzzle corresponding with puzzleId', async () => {
    const puzzle = await mockPuzzle();

    const puzzleId = puzzle.id;
    await prisma.puzzle.delete({
      where: {
        id: puzzleId
      }
    });

    const json = jest.fn();
    const status = jest.fn(() => {
      return { json };
    });
    const res = {
      status
    } as unknown as NextApiResponse;

    const puzzleInstanceData = {
      puzzleId: puzzle.id,
      hint: mockContent(),
      longitude: mockLongtitude(),
      latitude: mockLatitude(),
      address: mockAdress()
    };

    const req = {
      body: {
        ...puzzleInstanceData
      }
    } as unknown as NextApiRequest;

    await createPuzzleHandler(req, res);

    expect(json).toHaveBeenNthCalledWith(1, {
      message: 'Puzzle not found'
    });
    expect(status).toHaveBeenNthCalledWith(1, 404);
  });

  // TODO: Create more failed tests
});
