import { checkPuzzleAnswer } from "../../utils/puzzles";
import { Puzzle } from '@prisma/client';

it('should compare the user submitted puzzle answer with the ans key in the puzzle (from the db)',  () =>{
    const puzzle = {
        id: 1,
        name: "fake1",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        difficulty: 'EASY',
        content: [],
        imageUrl: null,
        exampleContent: [],
        exampleImageUrl: null,
        isGenerated: true,
        question:  'What is 1+1?',
        inputType: 'TEXT',
        published: false,
        variables: {
            answer: '2'
        } ,
        puzzleType: {},
        puzzleTypeId: 1,
        puzzleInstances: [],
    } as Puzzle;

    expect(checkPuzzleAnswer(puzzle , 1, '3')).toBeFalsy();
    expect(checkPuzzleAnswer(puzzle , 1, '2')).toBeTruthy();
});