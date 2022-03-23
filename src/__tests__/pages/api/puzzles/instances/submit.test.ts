import { NextApiRequest, NextApiResponse } from 'next';
import submitPuzzleHandler from '../../../../../pages/api/puzzles/instances/submit';
import { prisma } from '../../../../../__mocks__';
import { mockUser } from '../../../../../__mocks__/pages/api/auth';
import {
  mockPuzzle,
  mockPuzzleInstance
} from '../../../../../__mocks__/pages/api/puzzles';
import { mockContent } from '../../../../../__mocks__/pages/api/puzzles/instances/create';
import {
  mockAnswer,
  mockRandomSeed
} from '../../../../../__mocks__/pages/api/puzzles/instances/submit';

describe('/api/puzzles/instances/submit: Suceeded', () => {
  it('successfully submits the correct text answer to puzzle instance', async () => {
    const user = await mockUser();
    const answer = mockAnswer();
    const puzzle = await mockPuzzle();
    await prisma.puzzle.update({
      where: {
        id: puzzle.id
      },
      data: {
        variables: {
          answer
        }
      }
    });
    const puzzleInstance = await mockPuzzleInstance(puzzle);
    const puzzleId = puzzle.id;
    const randomSeed = mockRandomSeed();

    const json = jest.fn();
    const status = jest.fn(() => {
      return { json };
    });
    const res = {
      status
    } as unknown as NextApiResponse;
    const req = {
      body: {
        answer,
        puzzleInstanceId: puzzleInstance.id,
        puzzleId,
        randomSeed,
        userEmail: user.email
      }
    } as NextApiRequest;

    await submitPuzzleHandler(req, res);

    expect(json).toHaveBeenNthCalledWith(1, {
      message: 'Puzzle submitted successfully',
      submission: expect.objectContaining({
        answers: [answer],
        isCorrect: [true]
      })
    });
    expect(status).toHaveBeenNthCalledWith(1, 200);
  });

  it('successfully submits the correct mcq answer to puzzle instance', async () => {
    const user = await mockUser();
    const answer = mockAnswer();
    const puzzle = await mockPuzzle();
    await prisma.puzzle.update({
      where: {
        id: puzzle.id
      },
      data: {
        inputType: 'MCQ',
        variables: {
          answer,
          options: [answer, answer + mockAnswer(), answer + mockAnswer()]
        }
      }
    });
    const puzzleInstance = await mockPuzzleInstance(puzzle);
    const puzzleId = puzzle.id;
    const randomSeed = mockRandomSeed();

    const json = jest.fn();
    const status = jest.fn(() => {
      return { json };
    });
    const res = {
      status
    } as unknown as NextApiResponse;
    const req = {
      body: {
        answer,
        puzzleInstanceId: puzzleInstance.id,
        puzzleId,
        randomSeed,
        userEmail: user.email
      }
    } as NextApiRequest;

    await submitPuzzleHandler(req, res);

    expect(json).toHaveBeenNthCalledWith(1, {
      message: 'Puzzle submitted successfully',
      submission: expect.objectContaining({
        answers: [answer],
        isCorrect: [true]
      })
    });
    expect(status).toHaveBeenNthCalledWith(1, 200);
  });

  it('successfully submits the wrong answer to puzzle instance', async () => {
    const user = await mockUser();
    const answer = mockAnswer();
    const wrongAnswer = answer + mockAnswer();
    const puzzle = await mockPuzzle();
    await prisma.puzzle.update({
      where: {
        id: puzzle.id
      },
      data: {
        variables: {
          answer
        }
      }
    });
    const puzzleInstance = await mockPuzzleInstance(puzzle);
    const puzzleId = puzzle.id;
    const randomSeed = mockRandomSeed();

    const json = jest.fn();
    const status = jest.fn(() => {
      return { json };
    });
    const res = {
      status
    } as unknown as NextApiResponse;
    const req = {
      body: {
        answer: wrongAnswer,
        puzzleInstanceId: puzzleInstance.id,
        puzzleId,
        randomSeed,
        userEmail: user.email
      }
    } as NextApiRequest;

    await submitPuzzleHandler(req, res);

    expect(json).toHaveBeenNthCalledWith(1, {
      message: 'Puzzle submitted successfully',
      submission: expect.objectContaining({
        answers: [wrongAnswer],
        isCorrect: [false]
      })
    });
    expect(status).toHaveBeenNthCalledWith(1, 200);
  });

  // TODO: Add test for multiple submissions (random right and wrong answers)
});

// TODO: Add failed tests
