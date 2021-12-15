import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { getSession, signIn, useSession } from 'next-auth/react';
import { User } from 'next-auth';
import { Prisma, Puzzle, Submission } from '@prisma/client';
import { Button, Header } from '../../../components/Global';
import { PuzzleInput } from '../../../components/App';
import { getPuzzleInstance, submitPuzzleInstance } from '../../../services';
import { PuzzleInstanceCustom } from '../../../types/api/puzzles/instances/puzzleInstance';
import styles from '../../../styles/pages/PuzzlePage.module.scss';
import { HandledError } from '../../../types/error';

const PuzzlePage = ({
  puzzleInstance
}: {
  puzzleInstance: PuzzleInstanceCustom;
}) => {
  const puzzle = puzzleInstance.puzzle as Puzzle & Prisma.PuzzleInclude;
  const randomSeed = Math.random();
  const [answer, setAnswer] = useState('');
  const { data: session, status } = useSession();
  const user = session?.user as User;
  const isAuthenticated = status === 'authenticated';

  const handleSubmit = async (
    answer,
    puzzleInstance,
    puzzle,
    randomSeed,
    user
  ) => {
    if (isAuthenticated) {
      const submission = await submitPuzzleInstance(
        answer,
        puzzleInstance,
        puzzle,
        randomSeed,
        user
      );

      if ((submission as HandledError).error) {
        // TODO: handle errors from submitting
        alert(submission.message);
      }

      if ((submission as Submission).isCorrect) {
        const correctnessMessage = submission.isCorrect.at(-1)
          ? 'Correct! Nice work!'
          : 'Almost there! Try Again.';
        alert(`${correctnessMessage}`);
      }
    } else {
      alert('You must be logged in to submit puzzles!');
      // TODO: should be an alert dialog w/ link to login page
    }
  };

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
          {isAuthenticated ? (
            <Button
              style={'primary'}
              type={'submit'}
              content={'Submit'}
              onClick={() =>
                handleSubmit(answer, puzzleInstance, puzzle, randomSeed, user)
              }
            />
          ) : (
            <Button
              style={'primary'}
              content={'Login to Submit'}
              onClick={() => signIn()}
            />
          )}
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

  if ((puzzleInstance as HandledError).error) {
    const error = puzzleInstance as HandledError;
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
