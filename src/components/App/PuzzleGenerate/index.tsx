import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from './PuzzleGenerate.module.scss';
import { Button, Input } from '../../Global';
import { getAllPuzzles } from '../../../services';

const PuzzleGenerate = () => {
  const [puzzleList, setPuzzleList] = useState([]);
  const [hint, setHint] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [puzzle, setPuzzle] = useState('');

  const handleSubmit = () => {
    console.log(hint, latitude, longitude, address, puzzle);
  };

  useEffect(() => {
    const fetchPuzzles = async () => {
      setPuzzleList(await getAllPuzzles());
    };
    fetchPuzzles();
  }, []);

  return (
    <>
      <div className={ styles.form }>
        <h2> Make a puzzle instance </h2>
        <Input type='text' id='puzzleHint' required={ true } placeholder='Hint' setInputVal={ setHint } />
        <div className={ styles.puzzleLocation }>
          <Input type='text' id='puzzleLatitude' required={ true } placeholder='Latitude' setInputVal={ setLatitude } />
          <Input type='text' id='puzzleLongitude' required={ true } placeholder='Longitude' setInputVal={ setLongitude } />
          <Input type='text' id='puzzleAddress' required={ true } placeholder='Address' setInputVal={ setAddress } />
        </div>
        <div>
          { puzzleList.length > 0 && (
            <select className={ styles.selections } value={ puzzle } onChange={ (e) => setPuzzle(e.currentTarget.value) }>
              <optgroup label="Choose a puzzle from the puzzles below">
                { puzzleList.map((pzl, index) => (
                  <option value={ pzl.name } key={ `puzzle${index}` }>
                    { pzl.name }
                  </option>
                )) }
              </optgroup>
            </select>
          ) }
        </div>
        <div>
          <Button
            style="primary"
            type="submit"
            size="sm"
            content={ 'Submit' }
            arrowDirection="right"
            onClick={ () => handleSubmit() }
          />
        </div>
      </div>
    </>
  );
};

export default PuzzleGenerate;
