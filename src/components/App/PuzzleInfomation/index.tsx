import * as React from 'react';
import type { PuzzleInstance, Submission } from '@prisma/client';
import type { PuzzleCustom } from '../../../types/api/puzzles/puzzle';
import styles from './PuzzleInfomation.module.scss';
import { getAllPuzzleInstances, getAllSubmissions } from '../../../services';

const PuzzleInfomation = ({ puzzlesList }: { puzzlesList: PuzzleCustom[] }) => {
  const allPuzzleInstances = React.useRef<PuzzleInstance[]>([]);
  const allSubmissions = React.useRef<Submission[]>([]);

  // TODO: apply SWR
  React.useEffect(() => {
    getAllPuzzleInstances().then((res: PuzzleInstance[]) => {
      allPuzzleInstances.current = res;
    });
    getAllSubmissions().then((res: Submission[]) => {
      allSubmissions.current = res;
    });
  }, []);


  const calculateSuccessRate = (puzzle: PuzzleCustom) => {
    const puzzleId = puzzle.id;
    const puzzleAnswer = puzzle.variables['answer'];
    const puzzleInstances = allPuzzleInstances.current;
    const submissions = allSubmissions.current;

    const filteredPuzzleInstances = puzzleInstances.filter((instance) => instance.puzzleId === puzzleId);
    let countSuccess = 0;
    let totalLength = 0;
    filteredPuzzleInstances.forEach((puzzleInstance) => {
      const filteredSubmissions = submissions.filter((submission) => submission.puzzleInstanceId === puzzleInstance.id);
      totalLength += filteredSubmissions.length;
      countSuccess += filteredSubmissions.filter((submission) => submission.isCorrect).length;
    });
    if (totalLength === 0) {
      return 'No submission recorded';
    }
    return `${countSuccess / totalLength}`;
  }

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
              {calculateSuccessRate(puzzle)}
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
