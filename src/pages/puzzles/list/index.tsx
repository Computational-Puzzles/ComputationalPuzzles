import React, {useState} from 'react';
import {GetServerSideProps} from "next";
import {getAllPuzzleInstances} from "../../../services/puzzleInstance";
import {Header, SearchAndFilter} from "../../../components/Global";
import {CardGrid} from "../../../components/App";

// type PuzzleListTypes = {
//     puzzleInstances: PuzzleInstance[];
// };
const PuzzleList = ({puzzleInstances}) => {
    const [searchNFilter, setSearchNFilter] = useState<{searchText:string, filterFields: {EASY: boolean, MEDIUM: boolean, HARD: boolean}}>({
        searchText: '',
        filterFields: {EASY: false, MEDIUM: false, HARD: false}
    });
    const searchText = searchNFilter.searchText;
    const isEasy = searchNFilter.filterFields.EASY;
    const isMedium = searchNFilter.filterFields.MEDIUM;
    const isHard = searchNFilter.filterFields.HARD;

    return (
        <>
            <Header />
            <SearchAndFilter setSearchNFilterVal={setSearchNFilter}/>

            {/*if users did not select filter + seach*/}

            {/*if users did select filter + search}*/}
            <CardGrid cardList={
                puzzleInstances
                    .filter(instance =>
                        searchNFilter.filterFields[instance.puzzle.difficulty] === true
                    ).map(instance=>{ //return a card prop object for each instance
                        return{
                            name: instance.puzzle.name,
                            content: instance.puzzle.content,
                            difficulty: instance.puzzle.difficulty,
                            buttonActions:[
                                {
                                    text: 'View On Map',
                                    style: 'secondary',
                                    // action?: () => any, TODO: pass the instanceId to the map page, so user don't to filter again
                                    link: '/puzzles/map',
                                },
                                {
                                    text: 'Solve Online',
                                    style: 'primary',
                                    link: `/puzzles/[${instance.id}]`,
                                }
                            ]
                        };
                    })
            }/>
        </>
    );
};

export default PuzzleList;

export const getServerSideProps: GetServerSideProps = async () => {
    const puzzleInstances = await getAllPuzzleInstances(true);

    return {
        props: {
            puzzleInstances
        }
    };
};