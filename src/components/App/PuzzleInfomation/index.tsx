import * as React from 'react';
import type { PuzzleCustom } from '../../../types/api/puzzles/puzzle';
import styles from './PuzzleInfomation.module.scss';

const PuzzleInfomation = ({ puzzlesList }: { puzzlesList: PuzzleCustom[] }) => {
  return (
    <div className={styles.contentWrap}>
      <h3>Puzzle Infomation</h3>
      <div className={styles.tableHeader}>
        <h4>Puzzle Name</h4>
        <h4>Difficulty</h4>
        <h4>Success Rate</h4>
        <h4>Average Age</h4>
        <h4>Average Range</h4>
      </div>
      <hr />
      <div className={styles.tableBody}>
        {puzzlesList.map(puzzle => (
          <div className={styles.tableRow} key={puzzle.id}>
            <div>{puzzle.name}</div>
            <div>{puzzle.difficulty}</div>
            <div>
              {/* TODO: Calculate success Rate */}
              N/A
            </div>
            <div>
              {/* TODO: Implement Age */}
              N/A
            </div>
            <div>
              {/* TODO: Implement Age */}
              N/A
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PuzzleInfomation;
