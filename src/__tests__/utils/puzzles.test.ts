import { checkPuzzleAnswer } from '../../utils/puzzles';
import {mockMCQPuzzle, mockTxtPuzzle} from '../../__mocks__/pages/api/puzzles';
import { mockRandomSeed } from '../../__mocks__/pages/api/puzzles/instances/submit';
import {getRandomString} from '../../__mocks__/pages/api/getRandom';

describe('Comparing user submitted answer with the ans key in the puzzle (from the db) - ', () => {
    it('part1: MCQ', async () => {
        const mockSeed = mockRandomSeed();
        const pzl =  await mockMCQPuzzle();
        const ans = pzl.variables['answer'];
        let notAns = getRandomString();
        while(ans === notAns){
            notAns = getRandomString();
        }
        expect(checkPuzzleAnswer(pzl, mockSeed, notAns)).toBe(false);
        expect(checkPuzzleAnswer(pzl, mockSeed, ans)).toBe(true);
    });

    it('part2: Text question', async () => {
        const mockSeed = mockRandomSeed();
        const pzl =  await mockTxtPuzzle();
        const ans = pzl.variables['answer'];
        let notAns = getRandomString();
        while(ans === notAns){
            notAns = getRandomString();
        }
        expect(checkPuzzleAnswer(pzl, mockSeed, notAns)).toBe(false);
        expect(checkPuzzleAnswer(pzl, mockSeed, ans)).toBe(true);
    });

});

