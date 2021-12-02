import React from 'react';
import { useSession } from 'next-auth/react';
import { Header, Footer, LandingContent } from '../components/Product';

const Home = () => {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    // Then redirect the user to the app pages
  }

  return (
    <>
      <Header />
      <LandingContent />
      <Footer />
    </>
  );
};

export default Home;
