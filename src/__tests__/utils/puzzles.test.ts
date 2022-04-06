import { checkPuzzleAnswer } from '../../utils/puzzles';
import { mockPuzzle } from '../../__mocks__/pages/api/puzzles';
import { mockRandomSeed } from '../../__mocks__/pages/api/puzzles/instances/submit';
import {getRandomString} from '../../__mocks__/getRandom';
import {prisma} from "../../__mocks__";
import {mockOfficialAnswer, mockOptionsNoAns} from "../../__mocks__/pages/api/puzzles/instances/create";

describe('testing checkPuzzleAnswer: Comparing user submitted answer with the ans key in the puzzle (from the db) - ', () => {
    it('part1: MCQ', async () => {
        const mockSeed = mockRandomSeed();
        const ans = mockOfficialAnswer();
        const pzl = await mockPuzzle();
        await prisma.puzzle.update({
            where: {
                id: pzl.id
            },
            data: {
                inputType: 'MCQ',
                variables: {
                    answer: {ans},
                    options: mockOptionsNoAns().push(ans)
                },
            }
        });
        let notAns = getRandomString();
        while(ans === notAns){
            notAns = getRandomString();
        }
        expect(checkPuzzleAnswer(pzl, mockSeed, notAns)).toBe(false);
        expect(checkPuzzleAnswer(pzl, mockSeed, ans)).toBe(true);
    });

    it('part2: Text question', async () => {
        const mockSeed = mockRandomSeed();
        const pzl = await mockPuzzle();
        await prisma.puzzle.update({
            where: {
                id: pzl.id
            },
            data: {
                variables: {
                    answer: mockOfficialAnswer(),
                    options: []
                },
            }
        });
        const ans = pzl.variables['answer'];
        let notAns = getRandomString();
        while(ans === notAns){
            notAns = getRandomString();
        }
        expect(checkPuzzleAnswer(pzl, mockSeed, notAns)).toBe(false);
        expect(checkPuzzleAnswer(pzl, mockSeed, ans)).toBe(true);
    });

});

