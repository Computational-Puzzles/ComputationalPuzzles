import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { PuzzleProps } from '../../../prisma/schemaTypes';
import Button from '../../components/Global/Button';
import Image from 'next/image';
import PuzzleInput from '../../components/App/PuzzleInput';
import styles from '../../styles/pages/PuzzlePage.module.scss';
import { PrismaClient } from '@prisma/client';
import { submitPuzzle } from '../../utils/puzzles';
import { getSession, useSession } from 'next-auth/react';

const prisma = new PrismaClient();

const redirectBack = () => {
  // This depends on if they got here from doing a puzzle with a map or just from the list
  // Maybe just have 2 buttons for either case?
  alert('Redirect');
};

const PuzzlePage = ({ puzzle }: { puzzle: PuzzleProps }) => {
  const [answer, setAnswer] = useState('');
  const { data: session, status } = useSession();
  const randomSeed = Math.random();

  return (
    <>
      <Button style={'outline'} content={'Back'} onClick={redirectBack} />
      <div>
        <h2>{puzzle.name}</h2>
        <p>{puzzle.difficulty}</p>
      </div>

      <div className={styles.puzzleDisplay}>
        <div>{puzzle.content}</div>
        <div>
          <Image
            src={puzzle.imageUrl}
            width={200}
            height={200}
            alt={'puzzle image'}
          />
        </div>
      </div>

      <h3>Example</h3>
      <div className={styles.puzzleDisplay}>
        <div>{puzzle.exampleContent}</div>
        <div>
          <Image
            src={puzzle.exampleImageUrl}
            width={200}
            height={200}
            alt={'example image'}
          />
        </div>
      </div>

      <div>
        <h3>Quest</h3>
        <p>{puzzle.question}</p>
        <form action={`/api/puzzles/${puzzle.id}/submit`} method={'post'}>
          {/*<input hidden={true} name={'userEmail'} value={session?.user.email}/>*/}
          <input
            hidden={true}
            name={'userEmail'}
            value={'opeyadeyemi@gmail.com'}
          />
          <input hidden={true} name={'puzzleId'} value={puzzle.id} />
          <input hidden={true} name={'randomSeed'} value={puzzle.id} />
          <PuzzleInput
            type={puzzle.inputType}
            placeholder={'Enter your answer'}
            options={puzzle.variables?.options}
            setAnswer={setAnswer}
          />
          {/* TODO: lock submission button unless logged in */}
          <Button
            style={'primary'}
            type={'submit'}
            content={'Submit'}
            disabledMessage={
              session?.user ? 'Please log in before submitting puzzles!' : null
            }
          />
        </form>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false
  //     }
  //   };
  // }
  const id = +context.query.id;
  const puzzle = await prisma.puzzle.findUnique({
    where: {
      id
    },
    include: {
      puzzleType: true
    }
  });

  return {
    props: { puzzle, session }
  };
};

export default PuzzlePage;
