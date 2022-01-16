import * as React from 'react';
import { useState } from 'react';
import styles from './PuzzleGenerate.module.scss';
import toast from 'react-hot-toast';

import { Button, Input } from '../../Global';
import { QRGenerator } from '..';
import { createPuzzleInstance } from '../../../services';

const PuzzleGenerate = ({ puzzlesList }) => {
  const [hint, setHint] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [puzzleId, setPuzzleId] = useState('');
  const [puzzleInstanceData, setPuzzleInstanceData] = useState();

  const handleSubmit = () => {
    const puzzleInstancePromise = async () => {
      const puzzleInstance = await createPuzzleInstance(
        parseInt(puzzleId),
        parseFloat(longitude),
        parseFloat(latitude),
        address,
        hint
      );

      if (puzzleInstance.error) {
        throw new Error(puzzleInstance.message);
      } else {
        setPuzzleInstanceData(puzzleInstance);
      }
    };
    toast.promise(puzzleInstancePromise(), {
      loading: 'Making your puzzle instance... ⚙️',
      success: 'Success',
      error: 'Something went wrong :('
    });
  };

  return (
    <>
      <div className={styles.form}>
        <h2> Make a puzzle instance </h2>
        <Input
          type="text"
          id="puzzleHint"
          required={true}
          placeholder="Hint"
          setInputVal={setHint}
        />
        <div className={styles.puzzleLocation}>
          <Input
            type="text"
            id="puzzleLatitude"
            required={true}
            placeholder="Latitude"
            setInputVal={setLatitude}
          />
          <Input
            type="text"
            id="puzzleLongitude"
            required={true}
            placeholder="Longitude"
            setInputVal={setLongitude}
          />
          <Input
            type="text"
            id="puzzleAddress"
            required={true}
            placeholder="Address"
            setInputVal={setAddress}
          />
        </div>
        <div>
          {puzzlesList.length > 0 && (
            <select
              className={styles.selections}
              value={puzzleId}
              onChange={e => setPuzzleId(e.currentTarget.value)}
            >
              <option selected>Choose a puzzle</option>
              {puzzlesList.map((puzzle, index) => (
                <option value={puzzle.id} key={`puzzle${index}`}>
                  {puzzle.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <Button
            style="primary"
            type="submit"
            size="sm"
            content={'Submit'}
            arrowDirection="right"
            onClick={() => handleSubmit()}
          />
        </div>
        {puzzleInstanceData && (
          <div className={styles.qrCode}>
            {/** TODO: Create link to puzzle map page */}
            {/** TODO: Make it copiable */}
            <QRGenerator text={JSON.stringify(puzzleInstanceData)} />
          </div>
        )}
      </div>
    </>
  );
};

export default PuzzleGenerate;
