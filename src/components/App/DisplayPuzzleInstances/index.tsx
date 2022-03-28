import * as React from 'react';
import { useState, useEffect } from 'react';
import styles from './DisplayPuzzleInstances.module.scss';
import { PuzzleCustom } from '../../../types/api/puzzles/puzzle';
import { getAllPuzzleInstances } from '../../../services';
import { PuzzleInstance } from '@prisma/client';
import { Button } from '../../Global';
import { QRGenerator } from '../../App';
import toast from 'react-hot-toast';

type DisplayPuzzleInstancesProps = {
  puzzlesList: PuzzleCustom[],
}

const DisplayPuzzleInstances = ({ puzzlesList }: DisplayPuzzleInstancesProps) => {
  const [puzzleId, setPuzzleId] = useState<string>('');
  const [puzzleInstances, setPuzzleInstances] = useState<PuzzleInstance[]>([]);
  const [displayPuzzleInstances, setDisplayPuzzleInstances] = useState<PuzzleInstance[]>([]);

  const getPuzzleInstances = async () => {
    const retrivedPuzzleInstances = await getAllPuzzleInstances();
    setPuzzleInstances(retrivedPuzzleInstances);
  };

  useEffect(() => {
    getPuzzleInstances();
  }, []);

  useEffect(() => {
    getPuzzleInstances();
  }, [puzzlesList]);

  useEffect(() => {
    if (!puzzleInstances || !setDisplayPuzzleInstances) return;

    if (!puzzleId || puzzleId === '') {
      setDisplayPuzzleInstances(puzzleInstances);
    } else {
      setDisplayPuzzleInstances(puzzleInstances.filter(pzl => pzl.puzzleId.toString() === puzzleId));
    }
  }, [puzzleId, puzzleInstances, setDisplayPuzzleInstances]);

  return (
    <div className={styles.puzzleInstancesWrapper}>
      {/* HEADER */}
      <div className={styles.puzzleInstancesHeader}>
        <div className={styles.puzzleInstancesHeaderTitle}>
          <h3> See Locations </h3>
        </div>
        {/* Select puzzle */}
        <div className={styles.puzzleInstancesHeaderSelectWrapper}>
          {puzzlesList.length > 0 ? (
            <select
              className={styles.puzzleInstancesHeaderSelect}
              value={puzzleId}
              onChange={e => setPuzzleId(e.currentTarget.value)}
            >
              <option value='' key='all-puzzles' >All puzzles</option>
              {puzzlesList.map((puzzle: PuzzleCustom, index: number) => (
                <option value={puzzle.id} key={`puzzle${index}`}>
                  {puzzle.name}
                </option>
              ))}
            </select>
          ) : (
            <select
              className={styles.puzzleInstancesHeaderSelect}
              value='No puzzle available'
            >
            </select>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className={styles.puzzleInstancesBody}>
        {/* 3 cols table title */}
        <div className={styles.puzzleInstancesBodyTitle}>
          <h4> Address </h4>
          <h4> QR Code </h4>
          <h4> Actions </h4>
        </div>

        {/* 3 cols table content */}
        <div className={styles.puzzleInstancesBodyContent}>
          {displayPuzzleInstances.length > 0 && (
            displayPuzzleInstances.map((puzzleInstance: PuzzleInstance, index: number) => (
              <div className={styles.puzzleInstancesBodyContentRow} key={`puzzleInstance${index}`}>
                <div>
                  {puzzleInstance.address}
                </div>
                <div>
                  <QRGenerator
                    className={styles.puzzleInstancesBodyContentQR}
                    text={JSON.stringify(puzzleInstance)}
                  />
                </div>
                <div
                  className={styles.puzzleInstancesBodyContentActions}
                >
                  <Button
                    style='secondary'
                    content='View on map'
                    size='sm'
                    type='button'
                    arrowDirection='right'
                    onClick={() => { toast('TODO: View on map') }}
                  />
                  <Button
                    style='primary'
                    content='Delete'
                    size='sm'
                    type='button'
                    onClick={() => { toast('TODO: Delete puzzle instance by id') }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayPuzzleInstances;
