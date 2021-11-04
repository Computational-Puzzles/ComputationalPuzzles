import React from 'react';
import {CardGrid, Header} from '../../../components/App';
import {GetServerSideProps} from 'next';
import {PrismaClient, Puzzle, Difficulty} from '@prisma/client';
import {Filter, PuzzleCardProps} from "../../../components/Global";
import { MapRenderer } from '../../../components/App';

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
            <Filter />
            <CardGrid cardList={puzzleCardProps}/>
          <div>Puzzle Map</div>
          <MapRenderer markers={[{
            anchor: [49.805, -119.4778],
            zoom: 13
          }, {
            anchor: [49.8, -119.4778],
            zoom: 13
          }, {
            anchor: [49.81, -119.47784],
            zoom: 13
          }, {
            anchor: [50.88, -119.477829],
            zoom: 8
          }]} />
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
