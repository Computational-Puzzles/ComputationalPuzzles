import { Puzzle, PuzzleInstance, PuzzleType } from '@prisma/client';

import { prisma } from '../../..';
import {
  mockAdress,
  mockBoolean,
  mockContent,
  mockDifficulty,
  mockHint,
  mockLatitude,
  mockLongtitude,
  mockName,
  mockOfficialAnswer,
  mockQuestion
} from './instances/create';

export const mockPuzzleInstance = (
  puzzle?: Puzzle
): Promise<PuzzleInstance> => {
  return prisma.puzzleInstance.create({
    data: {
      hint: mockHint(),
      longitude: mockLongtitude(),
      latitude: mockLatitude(),
      address: mockAdress(),
      puzzle: puzzle
        ? {
            connect: {
              id: puzzle.id
            }
          }
        : {
            create: {
              name: mockName(),
              difficulty: mockDifficulty(),
              content: [mockContent(), mockContent(), mockContent()],
              question: mockQuestion(),
              variables: {},
              isGenerated: mockBoolean(),
              puzzleType: {
                create: {
                  name: mockName()
                }
              }
            }
          }
    }
  });
};

export const mockPuzzle = (): Promise<Puzzle> => {
  return prisma.puzzle.create({
    data: {
      name: mockName(),
      difficulty: mockDifficulty(),
      content: [mockContent(), mockContent(), mockContent()],
      question: mockQuestion(),
      variables: {
        answer: mockOfficialAnswer()
      },
      isGenerated: mockBoolean(),
      puzzleType: {
        create: {
          name: mockName()
        }
      }
    }
  });
};

export const mockPuzzleType = (): Promise<PuzzleType> => {
  return prisma.puzzleType.create({
    data: {
      name: mockName()
    }
  });
};
