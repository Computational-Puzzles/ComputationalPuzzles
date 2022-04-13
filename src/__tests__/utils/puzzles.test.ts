import { checkPuzzleAnswer } from '../../utils/puzzles';
import {
  mockMCQPuzzle,
  mockTxtPuzzle
} from '../../__mocks__/pages/api/puzzles';
import { mockRandomSeed } from '../../__mocks__/pages/api/puzzles/instances/submit';
import { getRandomString } from '../../__mocks__/getRandom';

describe("Correctly validates answer for MCQ puzzles for ", () => {
  it('MCQ puzzles', async () => {
    const mockSeed = mockRandomSeed();
    const pzl = await mockMCQPuzzle();
    const ans = pzl.variables['answer'];
    let notAns = getRandomString();
    while (ans === notAns) {
      notAns = getRandomString();
    }
    expect(checkPuzzleAnswer(pzl, mockSeed, notAns)).toBe(false);
    expect(checkPuzzleAnswer(pzl, mockSeed, ans)).toBe(true);
  });

  it('text puzzles', async () => {
    const mockSeed = mockRandomSeed();
    const pzl = await mockTxtPuzzle();
    const ans = pzl.variables['answer'];
    let notAns = getRandomString();
    while (ans === notAns) {
      notAns = getRandomString();
    }
    expect(checkPuzzleAnswer(pzl, mockSeed, notAns)).toBe(false);
    expect(checkPuzzleAnswer(pzl, mockSeed, ans)).toBe(true);
  });
});
