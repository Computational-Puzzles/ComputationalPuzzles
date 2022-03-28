import * as React from 'react';
import { useState } from 'react';
``;
import styles from './PuzzleGenerate.module.scss';
import toast from 'react-hot-toast';
import Modal from 'react-modal';

import { Button, Input } from '../../Global';
import { LocationSearchModal } from '..';
import { createPuzzleInstance } from '../../../services';
import { PuzzleCustom } from '../../../types/api/puzzles/puzzle';

const PuzzleGenerate = ({ puzzlesList, modalIsOpen, setModalIsOpen }) => {
  const [hint, setHint] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');
  const [puzzleId, setPuzzleId] = useState('');

  const handleSubmit = () => {
    const puzzleInstancePromise = async () => {
      const puzzleInstance = await createPuzzleInstance(
        parseInt(puzzleId),
        parseFloat(longitude),
        parseFloat(latitude),
        address,
        hint
      );

      if (puzzleInstance?.error) {
        throw new Error(puzzleInstance.message);
      }
    };
    toast.promise(puzzleInstancePromise(), {
      loading: 'Making your puzzle instance... ⚙️',
      success: 'Successfully added new puzzle instance',
      error: err => err.message
    });
  };

  return (
    <>
      <div className={styles.form}>
        <h3> Set New Puzzle Location </h3>
        <div className={styles.selectionWrapper}>
          {puzzlesList.length > 0 ? (
            <select
              className={styles.selections}
              value={puzzleId}
              onChange={e => setPuzzleId(e.currentTarget.value)}
            >
              <option>Choose a puzzle</option>
              {puzzlesList.map((puzzle: PuzzleCustom, index: number) => (
                <option value={puzzle.id} key={`puzzle${index}`}>
                  {puzzle.name}
                </option>
              ))}
            </select>
          ) : (
            <>
              <select className={styles.selections} value="No puzzle available">
                \
              </select>
            </>
          )}
        </div>
        <div className={styles.hintWrapper}>
          <Input
            type="text"
            id="puzzleHint"
            required={true}
            placeholder="Hint"
            setInputVal={setHint}
          />
        </div>
        <div className={styles.addressWrapper}>
          <Input
            id="address-displayer"
            type="text"
            placeholder="Address"
            value={address}
            setInputVal={setAddress}
            required={false}
            // disabled={true}
            onClick={() => setModalIsOpen(true)}
          />
          <Button
            style="secondary"
            content="Set Location"
            size="sm"
            type="button"
            onClick={() => setModalIsOpen(true)}
          />
        </div>
        <div>
          <Button
            style="primary"
            type="submit"
            content={'Submit'}
            arrowDirection="right"
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
      <Modal
        className={styles.modal}
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
        }}
        contentLabel="Example Modal"
        overlayClassName={styles.modalOverlay}
        appElement={document.getElementById('__next') as HTMLElement}
      >
        <LocationSearchModal
          address={address}
          latitude={latitude}
          longtitude={longitude}
          setAddress={setAddress}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          setModalIsOpen={setModalIsOpen}
        />
      </Modal>
    </>
  );
};

export default PuzzleGenerate;
