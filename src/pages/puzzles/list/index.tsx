import React, {useState} from 'react';
import {GetServerSideProps} from "next";
import {getAllPuzzleInstances} from "../../../services/puzzleInstance";
import {PuzzleInstance} from "../../../components/App/MapRenderer";
import {Header, SearchAndFilter} from "../../../components/Global";
import {CardGrid, CardList} from "../../../components/App";
import {DIFFICULTY} from "../../../types/global";
import {ButtonAction, ButtonStyle} from "../../../types/button";
import {CARD_TYPE} from "../../../types/cards";

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