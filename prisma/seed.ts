import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient, Prisma } from '@prisma/client';
import * as faker from 'faker';

const prisma = new PrismaClient();

const main = async () => {
  const puzzleType = await prisma.puzzleType.create({
    data: {
      name: 'Puzzle Type'
    }
  });

  const hardPuzzle = (index) =>
    prisma.puzzle.create({
      data: {
        name: `${index}. Hard Puzzle`,
        puzzleType: {
          connect: {
            id: puzzleType.id
          }
        },
        difficulty: 'HARD',
        content: ['This is a hard puzzle'],
        variables: {
          answer: 'Answer'
        },
        question: 'Question of hard puzzle?',
        isGenerated: false
      }
    });

  const mediumPuzzle = (index) =>
    prisma.puzzle.create({
      data: {
        name: `${index}. Medium Puzzle`,
        puzzleType: {
          connect: {
            id: puzzleType.id
          }
        },
        difficulty: 'MEDIUM',
        content: ['This is a medium puzzle'],
        variables: {
          answer: 'Answer'
        },
        question: 'Question of medium puzzle?',
        isGenerated: false
      }
    });

  const easysPuzzle = (index) =>
    prisma.puzzle.create({
      data: {
        name: `${index}. Easy Puzzle`,
        puzzleType: {
          connect: {
            id: puzzleType.id
          }
        },
        difficulty: 'EASY',
        content: ['This is an easy puzzle'],
        variables: {
          answer: 'Answer'
        },
        question: 'Question of easy puzzle?',
        isGenerated: false
      }
    });

  const puzzles = [hardPuzzle, mediumPuzzle, easysPuzzle];

  for (let i = 0; i < 10; i++) {
    const puzzle = await puzzles[Math.floor(Math.random() * 3)](i + 1);

    await prisma.puzzleInstance.create({
      data: {
        puzzle: {
          connect: {
            id: puzzle.id
          }
        },
        hint: `This is a hint (${i})`,
        longitude: parseFloat(faker.address.longitude()),
        latitude: parseFloat(faker.address.latitude()),
        address: faker.address.streetAddress(),
      }
    })
  }
};


main();