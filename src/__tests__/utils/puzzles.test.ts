import { checkPuzzleAnswer } from '../../utils/puzzles';
import puzzle from '../mocks/mock_puzzle';

it('should compare the user submitted puzzle answer with the ans key in the puzzle (from the db)', () => {
  const answer = puzzle.variables.answer;
  const notAns = getRandomNumber(answer);
  expect(checkPuzzleAnswer(puzzle, 1, notAns)).toBe(false);
  expect(checkPuzzleAnswer(puzzle, 1, answer)).toBe(true);
});

//get random number that does not equal to the answer
const getRandomNumber = ans => {
  let num;
  do {
    num = Math.round(Math.random() * 99);
  } while (num === ans);
  return num;
};
