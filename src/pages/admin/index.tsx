import * as React from 'react';
import { useState } from 'react';
import styles from '../../styles/pages/admin.module.scss';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import Modal from 'react-modal';
import { LocationSearchModal, PuzzleGenerate, PuzzleInfomation } from '../../components/App';
import { getAllPuzzles, isAdmin } from '../../services';
import { GetServerSideProps } from 'next';
import { Header } from '../../components/Global';
import type { PuzzleCustom } from '../../types/api/puzzles/puzzle';

const Admin = ({ puzzlesList }: { puzzlesList: PuzzleCustom[] }) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  return (
    <>
      <Header />
      {/** TODO: Create Header for admin page  */}
      <h3> Admin Dashboard </h3>
      <hr />
      {/* <PuzzleGenerate puzzlesList={puzzlesList} /> */}
      <div className={styles.contentWrap}>
        <PuzzleInfomation puzzlesList={puzzlesList} />
      </div>
      <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
      <Modal
        className={styles.modal}
        isOpen={modalIsOpen}
        onRequestClose={() => {setModalIsOpen(false)}}
        // style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={styles.modalOverlay}
      >
        <LocationSearchModal 
          address={address}
          setAddress={setAddress}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          setModalIsOpen={setModalIsOpen}
        />
      </Modal>
    </>
  )

};

const AdminValidation = ({ puzzlesList }: { puzzlesList: PuzzleCustom[] }) => {
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
      setValidAdmin(await isAdmin({ email }));
    };
    email && checkAdmin();
  }, [email]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    if (validAdmin) {
      return <Admin puzzlesList={puzzlesList} />
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
}

export const getServerSideProps: GetServerSideProps = async context => {
  const puzzlesList = await getAllPuzzles();
  return {
    props: { puzzlesList }
  };
};

export default AdminValidation;
