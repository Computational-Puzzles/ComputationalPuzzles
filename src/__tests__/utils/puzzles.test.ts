import { checkPuzzleAnswer } from '../../utils/puzzles';
import { mockPuzzle } from '../../__mocks__/pages/api/puzzles';
import { mockRandomSeed } from '../../__mocks__/pages/api/puzzles/instances/submit';
import {
  getRandomNumber,
  getRandomString
} from '../../__mocks__/pages/api/getRandom';
import puzzle from '../../__mocks__/mock_puzzle';
import {Puzzle} from "@prisma/client";

it('should compare the user submitted puzzle answer with the ans key in the puzzle (from the db)', () => {
  let pzl:Puzzle;
  let ans;
  try {
     mockPuzzle().variables
    pzl = mockPuzzle();
    ans = mockPuzzle().variables['answer'];
  } catch (e) {
    console.error(e);
    ans = puzzle.variables['answer'];
  } finally {
    const notAns = getRandomString(10);
    const mockSeed = mockRandomSeed();
    expect(checkPuzzleAnswer(pzl, mockSeed, notAns)).toBe(false);
    expect(checkPuzzleAnswer(pzl, mockSeed, ans)).toBe(true);
  }
});
