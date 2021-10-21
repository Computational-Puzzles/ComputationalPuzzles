import React from 'react';
import { useSession } from 'next-auth/react';
import { Header, Footer, Landing } from '../components/Product';

const Home: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    // Then redirect the user to the app pages
  }

  return (
    <>
      <Header />
      <Landing />
      <Footer />
    </>
  );
};

export default Home;
