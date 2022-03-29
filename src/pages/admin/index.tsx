import * as React from 'react';
import styles from '../../styles/pages/admin.module.scss';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import { PuzzleGenerate } from '../../components/App';
import { getAllPuzzles, isAdmin } from '../../services';
import { GetServerSideProps } from 'next';
import { AdminHeader, Header } from '../../components/Global';

const Admin = ({ puzzlesList }) => {
  const { data: session, status } = useSession();
  const [validAdmin, setValidAdmin] = React.useState(null);

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      Router.push('/auth/login');
    }
  }, [status]);

  const email = session?.user?.email;
  React.useEffect(() => {
    const checkAdmin = async () => {
      setValidAdmin(await isAdmin(email));
    };
    email && checkAdmin();
  }, [email]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    if (validAdmin) {
      return (
        <>
          <Header />
          <AdminHeader />
          <h1> ADMIN PAGE 🤓 </h1>
          {/** TODO: Create Header for admin page  */}
          <div className={styles.contentWrap}>
            <PuzzleGenerate puzzlesList={puzzlesList} />
          </div>
        </>
      );
    } else {
      validAdmin === false && Router.push('/403');
    } // This will need adjustment since it's just a prototype
  }

  return (
    status === 'unauthenticated' && (
      <>
        {/** TODO: Create Header for admin page  */}
        You are not authenticated <br />
        <button onClick={() => Router.push('/')}>Home</button>
      </>
    )
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const puzzlesList = await getAllPuzzles();
  return {
    props: { puzzlesList }
  };
};

export default Admin;
