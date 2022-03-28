import { checkPuzzleAnswer } from '../../utils/puzzles';
import { mockPuzzle } from '../../__mocks__/pages/api/puzzles';
import { mockRandomSeed } from '../../__mocks__/pages/api/puzzles/instances/submit.ts';
import { getRandomNumber } from '../../__mocks__/pages/api/getRandom';

it('should compare the user submitted puzzle answer with the ans key in the puzzle (from the db)', () => {
  const puzzle = mockPuzzle();
  const mockAns = mockPuzzle().variables?.answer;
  if (!mockAns) {
    console.log('Answer is not defined.');
  }
  let notAns;
  do {
    notAns = getRandomNumber();
  } while (mockAns === notAns);
  const mockSeed = mockRandomSeed();
  expect(checkPuzzleAnswer(puzzle, mockSeed, notAns)).toBe(false);
  expect(checkPuzzleAnswer(puzzle, mockSeed , mockAns)).toBe(true);
});
