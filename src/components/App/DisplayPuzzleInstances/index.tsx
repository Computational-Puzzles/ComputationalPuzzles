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
  puzzlesList: PuzzleCustom[];
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const DisplayPuzzleInstances = ({
  puzzlesList
}: DisplayPuzzleInstancesProps) => {
  const [puzzleId, setPuzzleId] = useState<string>('');
  const [allPuzzleInstances, setAllPuzzleInstances] = useState<
    PuzzleInstance[]
  >([]);
  const [puzzleInstances, setPuzzleInstances] = useState<PuzzleInstance[]>([]);

  const getPuzzleInstances = async () => {
    setAllPuzzleInstances(await getAllPuzzleInstances());
  };

  useEffect(() => {
    getPuzzleInstances();
  }, [puzzlesList]);

  useEffect(() => {
    if (!allPuzzleInstances || !setPuzzleInstances) return;

    if (!puzzleId) return setPuzzleInstances(allPuzzleInstances);

    setPuzzleInstances(
      allPuzzleInstances.filter(
        instance => instance.puzzleId.toString() === puzzleId
      )
    );
  }, [puzzleId, allPuzzleInstances, setPuzzleInstances]);

  return (
    <div className={styles.puzzleInstancesWrapper}>
      {/* HEADER */}
      <div className={styles.puzzleInstancesHeader}>
        <div className={styles.puzzleInstancesHeaderTitle}>
          <h3> See Locations </h3>
        </div>
        {/* Select puzzle */}
        <div className={styles.puzzleInstancesHeaderSelectWrapper}>
          {puzzlesList ? (
            <select
              className={styles.puzzleInstancesHeaderSelect}
              value={puzzleId}
              onChange={e => setPuzzleId(e.currentTarget.value)}
            >
              <option value="">All puzzles</option>
              {puzzlesList.map((puzzle: PuzzleCustom, index: number) => (
                <option value={puzzle.id} key={`puzzle${index}`}>
                  {puzzle.name}
                </option>
              ))}
            </select>
          ) : (
            <select
              className={styles.puzzleInstancesHeaderSelect}
              value="No puzzles available"
            ></select>
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
          {puzzleInstances &&
            puzzleInstances.map(
              (puzzleInstance: PuzzleInstance, index: number) => (
                <div
                  className={styles.puzzleInstancesBodyContentRow}
                  key={`puzzleInstance${index}`}
                >
                  <div>{puzzleInstance.address}</div>
                  <div>
                    <QRGenerator
                      className={styles.puzzleInstancesBodyContentQR}
                      text={`${BASE_URL}/puzzles/${puzzleInstance.id}`}
                    />
                  </div>
                  <div className={styles.puzzleInstancesBodyContentActions}>
                    <Button
                      style="secondary"
                      content="View on map"
                      size="sm"
                      type="button"
                      arrowDirection="right"
                      onClick={() => {
                        // TODO: View on map service
                        toast('Coming soon ✨');
                      }}
                    />
                    <Button
                      style="primary"
                      content="Delete"
                      size="sm"
                      type="button"
                      onClick={() => {
                        // TODO: Delete puzzle instance service
                        toast('Coming soon ✨');
                      }}
                    />
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default DisplayPuzzleInstances;
