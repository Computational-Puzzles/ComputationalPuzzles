import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { CardGrid } from '../components/App'

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return (
      <>
        <h1>Logged in</h1>
        <button onClick={() => signOut()}>Logout</button>
      </>
    );
  }
  return (
    <>
      <h1>Not logged in</h1>
      <button onClick={() => signIn()}>Login</button>
      <CardGrid cardList={ [{ title: 'Hello', desc: 'Hi', diff: 'easy' }, { title: 'Hello', desc: 'Hi', diff: 'easy' }, { title: 'Hello', desc: 'Hi', diff: 'easy' }, { title: 'Hello', desc: 'Hi', diff: 'easy' }] } />
    </>
  );
};

export default Home;
