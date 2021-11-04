import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getSession, useSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import { PuzzleProps } from '../../../prisma/schemaTypes';
import Button from '../../components/Global/Button';
import PuzzleInput from '../../components/App/PuzzleInput';
import styles from '../../styles/pages/PuzzlePage.module.scss';

const prisma = new PrismaClient();

const PuzzlePage = ({ puzzle }: { puzzle: PuzzleProps }) => {
  const [answer, setAnswer] = useState('');
  const { data: session, status } = useSession();
  const randomSeed = Math.random();

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
        <form action={`/api/puzzles/${puzzle.id}/submit`} method={'post'}>
          <input hidden={true} name={'userEmail'} value={session?.user.email} />
          <input hidden={true} name={'puzzleId'} value={puzzle.id} />
          <input hidden={true} name={'randomSeed'} value={randomSeed} />
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
            onClick={() => alert('Alert Message')}
          />
        </form>
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);
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
