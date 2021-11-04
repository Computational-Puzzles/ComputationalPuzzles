import React from 'react';
import {CardGrid, Header} from '../../../components/App';
import {GetServerSideProps} from 'next';
import {PrismaClient, Puzzle, Difficulty} from '@prisma/client';
import {PuzzleCardProps} from "../../../components/Global";

const prisma = new PrismaClient();

const getPuzzleDifficulty = (difficulty: Difficulty) => {
    if(difficulty === 'EASY') return 'easy';
    if(difficulty === 'MEDIUM') return 'medium';
    if(difficulty === 'HARD') return 'hard';
}

const PuzzleMap = (
    {puzzles}: { puzzles: Puzzle[] }
) => {
    const puzzleCardProps = puzzles.map(puzzle => {
        return {
            title: puzzle.name,
            desc: puzzle.content,
            diff: getPuzzleDifficulty(puzzle.difficulty),
            link: `/puzzles/${puzzle.id}`
        } as PuzzleCardProps
    }
)
    return (
        <>
            <Header/>
            <CardGrid cardList={puzzleCardProps}/>
            Puzzle Map
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const puzzles = await prisma.puzzle.findMany();

    return {
        props: {puzzles}
    };
};

export default PuzzleMap;
