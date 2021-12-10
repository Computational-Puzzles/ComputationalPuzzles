import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './PuzzleGenerate.module.scss';
import { Button } from '../../Global';
import { getAllPuzzles } from '../../../services';
import {createPuzzleInstance} from "../../../services/puzzleInstance";

const PuzzleGenerate = () => {
  const handleSubmit = event => {
    event.preventDefault();
    const hint = event.target[0].value;
    const latitude = event.target[1].value;
    const longitude = event.target[2].value;
    const address = event.target[3].value;
    const puzzle = event.target[4].value;

    console.log(hint, latitude, longitude, address, puzzle);
    createPuzzleInstance(puzzle, longitude, latitude, address, hint).then(r => console.log(r));
  };

  const [puzzleList, setPuzzleList] = useState([]);

  useEffect(() => {
    const fetchPuzzles = async () => {
      setPuzzleList(await getAllPuzzles());
    };
    fetchPuzzles();
  }, []);

  return (
    <>
      <form className={styles.form} onSubmit={event => handleSubmit(event)}>
        <h2> Make a puzzle instance </h2>
        <input type="text" id="puzzleHint" placeholder="Hint" />
        <div className={styles.puzzleLocation}>
          <input type="text" id="puzzleLatitude" placeholder="Latitude" />
          <input type="text" id="puzzleLongitude" placeholder="Longitude" />
          <input type="text" id="puzzleAddress" placeholder="Address" />
        </div>
        <div>
          {puzzleList.length > 0 && (
            <select className={styles.selections}>
              <optgroup label="Choose a puzzle from the puzzles below">
                {puzzleList.map((puzzle, index) => (
                  <option value={puzzle.id} key={`puzzle${index}`}>
                    {puzzle.name}
                  </option>
                ))}
              </optgroup>
            </select>
          )}
        </div>
        <div>
          {/* <input type='submit' value='Submit' /> */}
          <Button
            style="primary"
            type="submit"
            size="sm"
            content={'Submit'}
            arrowDirection="right"
            onClick={() => {}}
          />
        </div>
      </form>
    </>
  );
};

export default PuzzleGenerate;
