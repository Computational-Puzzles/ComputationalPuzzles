import { NextApiRequest, NextApiResponse } from 'next';
import submitPuzzleHandler from '../../../../../pages/api/puzzles/instances/submit';
import { prisma } from '../../../../../__mocks__';
import { mockUser } from '../../../../../__mocks__/pages/api/auth';
import { mockPuzzleInstance } from '../../../../../__mocks__/pages/api/puzzles';
import { mockAnswer, mockRandomSeed } from '../../../../../__mocks__/pages/api/puzzles/instances/submit';

describe('/api/puzzles/instances/submit: Suceeded', () => {
  it('successfully submits the answer to puzzle instance', async () => {
    const user = await mockUser();
    const puzzleInstance = await mockPuzzleInstance();
    const puzzleId = puzzleInstance.puzzleId;
    const randomSeed = mockRandomSeed();
    const answer = mockAnswer();

    const json = jest.fn();
    const status = jest.fn(() => {
      return { json };
    });
    const res = {
      status,
    } as unknown as NextApiResponse;
    const req = {
      body: {
        answer,
        puzzleInstanceId: puzzleInstance.id,
        puzzleId,
        randomSeed,
        userEmail: user.email,
      },
     } as NextApiRequest;

    await submitPuzzleHandler(req, res);

    expect(json).toHaveBeenNthCalledWith(1, {
      message: 'Puzzle submitted successfully',
      submission: expect.objectContaining({
        answers: expect.arrayContaining([answer]),
      }),
    });
    expect(status).toHaveBeenNthCalledWith(1, 200);
  });
});
