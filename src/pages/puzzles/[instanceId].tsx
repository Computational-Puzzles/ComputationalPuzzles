import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSession, useSession } from 'next-auth/react';
import { Prisma, Puzzle, PuzzleInstance, PuzzleType } from '@prisma/client';
import Button from '../../components/Global/Button';
import PuzzleInput from '../../components/App/PuzzleInput';
import styles from '../../styles/pages/PuzzlePage.module.scss';
import { submitPuzzleInstance } from '../../utils/puzzles';
import { User } from 'next-auth';
import axios from 'axios';

type puzzlePageProps = {
  puzzleInstance: PuzzleInstance;
  puzzle: Puzzle;
  puzzleType: PuzzleType;
};

const PuzzlePage = ({
  puzzleInstance,
  puzzle,
  puzzleType
}: puzzlePageProps) => {
  const [answer, setAnswer] = useState('');
  const { data: session, status } = useSession();
  const randomSeed = Math.random();
  const user = session?.user as User;

  return (
    <main>
      <section>
        <Link href={'/puzzles/map'} passHref>
          <Button style={'outline'} content={'Map'} onClick={() => null} />
        </Link>
      </section>
      <section>
        <h2>{puzzle.name}</h2>
        <p>{puzzle.difficulty}</p>
        <p>
          {puzzleInstance.address} ({puzzleInstance.longitude},{' '}
          {puzzleInstance.latitude})
        </p>
        <p>{puzzleInstance.hint}</p>
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
      </section>
      <section>
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
      </section>
      <section>
        <h3>Quest</h3>
        <p>{puzzle.question}</p>
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
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);
  const id = +context.query.instanceId;
  const puzzleInstance: Prisma.PuzzleInstanceInclude = await axios.get(
    `/api/puzzles/instances/${id}?verbose=true`
  );
  const puzzle = puzzleInstance.puzzle;
  // @ts-ignore
  const puzzleType = puzzleInstance.puzzle.puzzleType;
  return {
    props: { puzzleInstance, puzzle, puzzleType, session }
  };
};

export default PuzzlePage;
