import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient, Puzzle, PuzzleType } from '@prisma/client';
import * as faker from 'faker';

const prisma = new PrismaClient();

import seedData from './seed.json';
import type { DIFFICULTY } from '../../src/types/global';
console.log(seedData);

const createPuzzleType = () => {
  const puzzleTypes = seedData.puzzleType;
  return Promise.all(
    puzzleTypes.map(puzzleType =>
      prisma.puzzleType.create({
        data: {
          name: puzzleType.name
        }
      })
    )
  );
};

const difficulties: DIFFICULTY[] = ['EASY', 'MEDIUM', 'HARD'];

const createPuzzle = (createdPuzzleTypes: PuzzleType[]) => {
  const puzzles = seedData.puzzle;

  return Promise.all(
    puzzles.map(puzzle => {
      // find puzzle type
      const puzzleType = createdPuzzleTypes.find(
        createdPuzzleType => createdPuzzleType.name === puzzle.type
      );

      puzzle.difficulty =
        difficulties[Math.floor(Math.random() * difficulties.length)];

      return prisma.puzzle.create({
        data: {
          name: puzzle.name,
          puzzleType: {
            connect: {
              id: puzzleType.id
            }
          },
          difficulty: puzzle.difficulty as DIFFICULTY,
          content: puzzle.content,
          variables: puzzle.variables,
          question: puzzle.question,
          isGenerated: puzzle.isGenerated
        }
      });
    })
  );
};

const createPuzzleInstance = (createdPuzzles: Puzzle[]) => {
  const puzzleInstances = seedData.puzzleInstance;
  puzzleInstances.forEach(async puzzleInstance => {
    const puzzle = createdPuzzles.find(
      createdPuzzle => createdPuzzle.name === puzzleInstance.puzzle
    );
    await prisma.puzzleInstance.create({
      data: {
        puzzle: {
          connect: {
            id: puzzle.id
          }
        },
        hint: puzzleInstance.hint,
        longitude: parseFloat(faker.address.longitude()),
        latitude: parseFloat(faker.address.latitude()),
        address: faker.address.streetAddress()
      }
    });
  });
};

const runAll = async () => {
  const createdPuzzleTypes = await createPuzzleType();
  const createdPuzzles = await createPuzzle(createdPuzzleTypes);
  createPuzzleInstance(createdPuzzles);
};

runAll();
