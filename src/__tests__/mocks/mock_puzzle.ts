import {Puzzle} from "@prisma/client";

const puzzle = {
    id: 1,
    name: 'fake1',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    difficulty: 'EASY',
    content: [],
    imageUrl: null,
    exampleContent: [],
    exampleImageUrl: null,
    isGenerated: true,
    question: 'What is 1+1?',
    inputType: 'TEXT',
    published: false,
    variables: {
        answer: '2'
    },
    puzzleType: {},
    puzzleTypeId: 1,
    puzzleInstances: []
} as Puzzle;

export default puzzle;