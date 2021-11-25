import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Header, Footer, LandingContent } from '../components/Product';

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    // Then redirect the user to the app pages
  }
  console.log(session);
  return (
    <>
      <Header />
      <LandingContent />
      <Footer />
      <button onClick={() => signOut()}>sign Out</button>
      <button onClick={() => signIn()}>Login</button>
    </>
  );
};

export default Home;
