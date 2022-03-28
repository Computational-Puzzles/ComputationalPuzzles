import { checkPuzzleAnswer } from '../../utils/puzzles';
import puzzle from '../../__mocks__/mock_puzzle';
import {mockPuzzle} from '../../__mocks__/pages/api/puzzles';
import {getRandomNumber} from "../../__mocks__/pages/api/getRandom";

it('should compare the user submitted puzzle answer with the ans key in the puzzle (from the db)', () => {
  // const answer = puzzle.variables?.answer;
  const mockAns = mockPuzzle().variables?.answer;
  if(mockAns){
    console.log("Answer is not defined.")
  }
  let notAns;
  do{
    notAns =getRandomNumber();
  }while(mockAns === notAns)
  expect(checkPuzzleAnswer(puzzle, 1, notAns)).toBe(false);
  expect(checkPuzzleAnswer(puzzle, 1, mockAns)).toBe(true);
});

