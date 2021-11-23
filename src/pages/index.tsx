import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

const Home = () => {
  const { data: session, status } = useSession();
    console.log('session', session);
    console.log('status', status);

  if (status === 'authenticated') {
    return (
      <>
          <h1>Logged in as</h1>
          <p> {session.user.email}</p>
          <button onClick={() => signOut()}>Logout</button>
      </>
    );
  }
  return (
    <>
      <h1>Not logged in</h1>
      <button onClick={() => signIn()}>Login</button>
    </>
  );
};

export default Home;
