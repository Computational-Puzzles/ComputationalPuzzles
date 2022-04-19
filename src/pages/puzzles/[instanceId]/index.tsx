import React, { useState } from 'react';
import styles from '../../../styles/pages/PuzzlePage.module.scss';
import Image from 'next/image';
import Router from 'next/router';
import toast from 'react-hot-toast';

import { Prisma } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { User } from 'next-auth';
import { getSession, signIn, useSession } from 'next-auth/react';
import { Button, Difficulty, Navbar } from '../../../components/Global';
import { FeedbackGif, PuzzleInput } from '../../../components/App';
import { getPuzzleInstance, submitPuzzleInstance } from '../../../services';
import { initializeRandomGifSrc } from '../../../services/feedbackGif';
import { getRandomGifSrc } from '../../../utils/feedbackGif';

import type { Puzzle } from '@prisma/client';
import type { HandledError } from '../../../types/error';
import type { FeedbackGifList } from '../../../types/feedbackGif';
import type { PuzzleInstanceCustom } from '../../../types/api/puzzles/instances/puzzleInstance';

const PuzzlePage = ({
  puzzleInstance,
  allFeedbackGifs
}: {
  puzzleInstance: PuzzleInstanceCustom;
  allFeedbackGifs: FeedbackGifList;
}) => {
  const puzzle = puzzleInstance.puzzle as Puzzle & Prisma.PuzzleInclude;
  const randomSeed = Math.random();
  const [answer, setAnswer] = useState('');
  const [feedbackGifSrc, setFeedbackGifSrc] = useState('');
  const [isRecentCorrect, setIsRecentCorrect] = useState(null);

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
      const submissionInstance = async () => {
        const submission = await submitPuzzleInstance(
          answer,
          puzzleInstance,
          puzzle,
          randomSeed,
          user
        );

        if ((submission as HandledError).error) {
          throw new Error((submission as HandledError).message);
        } else {
          const success = submission.isCorrect[submission.isCorrect.length - 1];

          const feedbackGifs = success
            ? allFeedbackGifs.correct
            : allFeedbackGifs.incorrect;

          setIsRecentCorrect(success);
          setFeedbackGifSrc(getRandomGifSrc(feedbackGifs, success));

          if (!success) {
            throw new Error('Almost there! Try Again');
          }
        }
      };

      toast.promise(submissionInstance(), {
        loading: 'Submitting your answer... ⏳',
        success: 'Correct! Nice work!',
        error: err => err.message
      });
    } else {
      toast.error(t => (
        <span>
          You must be logged in to submit an answer.
          <button
            onClick={() => {
              toast.dismiss(t.id);
              Router.push('/auth/signin');
            }}
          >
            Login
          </button>
        </span>
      ));
      // TODO: should be an alert dialog w/ link to login page
    }
  };

  return (
    <>
      <Navbar />
      <main className={`${styles.wrapper} ${styles.cardSpacer}`}>
        <section>
          <div>
            <h1>{puzzle.name}</h1>
            <p>
              Difficulty: <Difficulty difficulty={puzzle.difficulty} />
            </p>
            <p>Find at: {puzzleInstance.address}</p>
          </div>
        </section>
        <section className={`${styles.card}`}>
          <div className={styles.text}>
            <div className={styles.cardHeader}>
              <h2 className={styles.title}>Description</h2>
            </div>
            <div className={styles.cardContent}>
              <div>
                {puzzle.content.map((text, index) => (
                  <p key={`content_text_${index}`}>{text}</p>
                ))}
              </div>
            </div>
          </div>
          {puzzle.imageUrl && (
            <div className={styles.image}>
              <Image
                src={puzzle.imageUrl}
                width={500}
                height={500}
                alt={'puzzle image'}
              />
            </div>
          )}
        </section>
        <section className={`${styles.card}`}>
          <div className={styles.text}>
            <div className={styles.cardHeader}>
              <h2 className={styles.title}>Example</h2>
            </div>
            <div className={styles.cardContent}>
              <div>
                {puzzle.exampleContent.map((text, index) => (
                  <p key={`example_content_text_${index}`}>{text}</p>
                ))}
              </div>
            </div>
          </div>
          {puzzle.exampleImageUrl && (
            <div className={styles.image}>
              <Image
                src={puzzle.exampleImageUrl}
                width={500}
                height={500}
                alt={'example image'}
              />
            </div>
          )}
        </section>
        <section className={styles.quest}>
          <h2 className={styles.title}>Quest</h2>
          <p className={styles.question}>{puzzle.question}</p>
          {isRecentCorrect !== null && feedbackGifSrc && (
            <div className={styles.feedbackContainer}>
              <FeedbackGif success={isRecentCorrect} src={feedbackGifSrc} />
            </div>
          )}
          <div className={styles.inputs}>
            <PuzzleInput
              type={puzzle.inputType}
              placeholder={'Enter your answer'}
              options={puzzle.variables['options']}
              answer={answer}
              setAnswer={setAnswer}
            />
          </div>
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
              arrowDirection={'right'}
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

  const allFeedbackGifs = initializeRandomGifSrc();

  return {
    props: { puzzleInstance, allFeedbackGifs, session }
  };
};

export default PuzzlePage;
