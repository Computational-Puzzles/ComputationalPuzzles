import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { PuzzleProps } from '../../../prisma/schemaTypes';
import Button from '../../components/Global/Button';
import Image from 'next/image';
import PuzzleInput from '../../components/App/PuzzleInput';
import styles from '../../styles/pages/PuzzlePage.module.scss';

const redirectBack = () => {
  // This depends on if they got here from doing a puzzle with a map or just from the list
  // Maybe just have 2 buttons for either case?
  alert('Redirect');
};

const PuzzlePage = ({
  id,
  name,
  difficulty,
  content,
  imageUrl,
  exampleContent,
  exampleImageUrl,
  question,
  inputType,
  variables
}: PuzzleProps) => {
  const [answer, setAnswer] = useState('');

  const submitPuzzle = () => {
    // TODO: can they do this without being logged in?
    alert(`Submit Puzzle Answer ${answer}`);
    // TODO: save a Submission object for this submission
  };

  return (
    <>
      <Button type={'outline'} content={'Back'} onClick={redirectBack} />
      <div>
        <h2>{name}</h2>
        <p>{difficulty}</p>
      </div>

      <div className={styles.puzzleDisplay}>
        <div>{content}</div>
        <div>
          <Image src={imageUrl} width={200} height={200} alt={'puzzle image'} />
        </div>
      </div>

      <h3>Example</h3>
      <div className={styles.puzzleDisplay}>
        <div>{exampleContent}</div>
        <div>
          <Image
            src={exampleImageUrl}
            width={200}
            height={200}
            alt={'example image'}
          />
        </div>
      </div>

      <div>
        <h3>Quest</h3>
        <p>{question}</p>
        <PuzzleInput
          type={inputType}
          placeholder={'Enter your answer'}
          options={variables.options}
          setAnswer={setAnswer}
        />
        <Button type={'primary'} content={'Submit'} onClick={submitPuzzle} />
      </div>
    </>
  );
};

const MOCK_PUZZLE_PAGE_DATA = {
  id: 1,
  name: 'Test Puzzle',
  difficulty: 'EASY',
  content: 'This is the puzzle content',
  imageUrl: '/puzzleImages/test.jpg',
  exampleContent: 'This is example content',
  exampleImageUrl: '/puzzleImages/test.jpg',
  isGenerated: '',
  question: 'Answer the question?',
  hint: '',
  inputType: 'text',
  published: false,
  variables: {
    options: ['A', 'B', 'C', 'D']
  },
  puzzleTypeId: 1
};

export const getServerSideProps: GetServerSideProps = async context => {
  const id = context.query.id;
  return {
    props: { ...MOCK_PUZZLE_PAGE_DATA }
  };
};

export default PuzzlePage;
