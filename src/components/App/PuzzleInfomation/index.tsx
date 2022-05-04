import * as React from 'react';
import type { PuzzleInstance, Submission } from '@prisma/client';
import type { PuzzleCustom } from '../../../types/api/puzzles/puzzle';
import styles from './PuzzleInfomation.module.scss';
import { getAllPuzzleInstances, getAllSubmissions } from '../../../services';

const PuzzleInfomation = ({ puzzlesList }: { puzzlesList: PuzzleCustom[] }) => {
  const [puzzleInstances, setPuzzleInstances] = React.useState<
    PuzzleInstance[]
  >([]);
  const [submissions, setSubmissions] = React.useState<Submission[]>([]);

  // TODO: apply SWR
  React.useEffect(() => {
    getAllPuzzleInstances().then((res: PuzzleInstance[]) => {
      setPuzzleInstances(res);
    });
    getAllSubmissions().then((res: Submission[]) => {
      setSubmissions(res);
    });
  }, []);

  const calculateSuccessRate = (puzzle: PuzzleCustom) => {
    const puzzleId = puzzle.id;
    console.log(puzzle, puzzleInstances, submissions);

    const filteredPuzzleInstances = puzzleInstances
      ? puzzleInstances.filter(instance => instance.puzzleId === puzzleId)
      : [];
    let countSuccess = 0;
    let totalLength = 0;
    filteredPuzzleInstances &&
      filteredPuzzleInstances.forEach(puzzleInstance => {
        const filteredSubmissions = submissions
          ? submissions.filter(
              submission => submission.puzzleInstanceId === puzzleInstance.id
            )
          : [];
        console.log(puzzle.name, filteredSubmissions);
        totalLength += filteredSubmissions.length;
        countSuccess += filteredSubmissions.reduce(
          (a, b) => a + b.isCorrect.reduce((a, b) => a + (b ? 1 : 0), 0),
          0
        );
      });
    if (totalLength === 0) {
      return 'No submission recorded';
    }
    return `${(countSuccess / totalLength) * 100}%`;
  };

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
        {puzzlesList &&
          puzzlesList.map(puzzle => (
            <div className={styles.tableRow} key={puzzle.id}>
              <div>{puzzle.name}</div>
              <div>{puzzle.difficulty}</div>
              <div>{calculateSuccessRate(puzzle)}</div>
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
