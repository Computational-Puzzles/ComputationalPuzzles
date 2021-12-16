import * as React from 'react';
import { useState } from 'react';
import styles from './PuzzleGenerate.module.scss';
import { Button, Input } from '../../Global';
import { createPuzzleInstance } from '../../../services';

const PuzzleGenerate = ({ puzzlesList }) => {
  const [hint, setHint] = useState('');
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [address, setAddress] = useState('');
  const [puzzleId, setPuzzleId] = useState(puzzlesList.length > 0 && puzzlesList[0].id);

  const handleSubmit = () => {
    puzzleId &&
      createPuzzleInstance(
        parseInt(puzzleId),
        longitude,
        latitude,
        address,
        hint
      ).then(puzzleInstance => console.log(puzzleInstance));
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
              <optgroup label="Choose a puzzle from the puzzles below">
                {puzzlesList.map((puzzle, index) => (
                  <option value={puzzle.id} key={`puzzle${index}`}>
                    {puzzle.name}
                  </option>
                ))}
              </optgroup>
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
      </div>
    </>
  );
};

export default PuzzleGenerate;
