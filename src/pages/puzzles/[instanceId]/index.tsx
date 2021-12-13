import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { getSession, useSession } from 'next-auth/react';
import { Prisma, Puzzle, PuzzleType } from '@prisma/client';
import Button from '../../../components/Global/Button';
import PuzzleInput from '../../../components/App/PuzzleInput';
import styles from '../../../styles/pages/PuzzlePage.module.scss';
import { submitPuzzleInstance } from '../../../utils/puzzles';
import { User } from 'next-auth';
import { getPuzzleInstance } from '../../../services/puzzleInstance';
import Header from '../../../components/Global/Header';
import { PuzzleInstanceCustom } from '../../../types/api/puzzles/instances/puzzleInstance';

type puzzlePageProps = {
  puzzleInstance: PuzzleInstanceCustom;
};

const PuzzlePage = ({ puzzleInstance }: puzzlePageProps) => {
  const puzzle = puzzleInstance.puzzle as Puzzle & Prisma.PuzzleInclude;
  const puzzleType = puzzleInstance.puzzle.puzzleType as PuzzleType;
  const randomSeed = Math.random();

  const [answer, setAnswer] = useState('');
  const { data: session, status } = useSession();
  const user = session?.user as User;

  return (
    <>
      <Header />
      <main className={`${styles.wrapper} ${styles.cardSpacer}`}>
        <section>
          <div>
            <h2>{puzzle.name}</h2>
            <p className={styles.difficulty}>{puzzle.difficulty}</p>
            <p>Find at: {puzzleInstance.address}</p>
            <p className={styles.hint}>Hint: {puzzleInstance.hint}</p>
          </div>
        </section>
        <section className={`${styles.card}`}>
          <div className={styles.text}>
            <div className={styles.cardHeader}>
              <h3 className={styles.title}>Description</h3>
            </div>
            <div className={styles.cardContent}>
              <div>{puzzle.content}</div>
            </div>
          </div>
          <div className={styles.image}>
            <Image
              src={puzzle.imageUrl}
              width={500}
              height={500}
              alt={'puzzle image'}
            />
          </div>
        </section>
        <section className={`${styles.card}`}>
          <div className={styles.text}>
            <div className={styles.cardHeader}>
              <h3 className={styles.title}>Example</h3>
            </div>
            <div className={styles.cardContent}>
              <div>{puzzle.exampleContent}</div>
            </div>
          </div>
          <div className={styles.image}>
            <Image
              src={puzzle.exampleImageUrl}
              width={500}
              height={500}
              alt={'example image'}
            />
          </div>
        </section>
        <section className={styles.quest}>
          <h3 className={styles.title}>Quest</h3>
          <p className={styles.question}>{puzzle.question}</p>
          <PuzzleInput
            type={puzzle.inputType}
            placeholder={'Enter your answer'}
            options={puzzle.variables['options']}
            setAnswer={setAnswer}
          />
          {/* TODO: lock submission button unless logged in */}
          <Button
            style={'primary'}
            type={'submit'}
            content={'Submit'}
            onClick={() =>
              submitPuzzleInstance(
                answer,
                puzzleInstance,
                puzzle,
                randomSeed,
                user
              )
            }
          />
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);
  const id = +context.query.instanceId;

  const puzzleInstance: PuzzleInstanceCustom | Error = await getPuzzleInstance(
    id,
    true
  );

  if ((puzzleInstance as Error).message) {
    const error = puzzleInstance as Error;
    if (error.name === '404') {
      return { notFound: true };
    } else {
      return {
        redirect: {
          destination: '/500',
          permanent: false
        }
      };
    }
  }

  return {
    props: { puzzleInstance, session }
  };
};

export default PuzzlePage;
