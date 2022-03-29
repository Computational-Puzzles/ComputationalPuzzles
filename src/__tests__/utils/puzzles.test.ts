import { checkPuzzleAnswer } from '../../utils/puzzles';
import { mockPuzzle } from '../../__mocks__/pages/api/puzzles';
import { mockRandomSeed } from '../../__mocks__/pages/api/puzzles/instances/submit.ts';
import {getRandomNumber, getRandomString} from '../../__mocks__/pages/api/getRandom';
import puzzle from "../../__mocks__/mock_puzzle";

it('should compare the user submitted puzzle answer with the ans key in the puzzle (from the db)', () => {
  let pzl;
  let ans;
  try{
    pzl = pzl = mockPuzzle();
    ans = mockPuzzle().variables?.answer;
  }catch (e){
    console.log(e);
  }finally {
    ans = puzzle.variables.answer;
  }
  const notAns = getRandomString(10);
  const mockSeed = mockRandomSeed();
  expect(checkPuzzleAnswer(pzl, mockSeed, notAns)).toBe(false);
  expect(checkPuzzleAnswer(pzl, mockSeed , ans)).toBe(true);
});
