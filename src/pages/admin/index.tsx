import * as React from 'react';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import { QRGenerator } from '../../components/App';

const Admin = () => {
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      Router.push('/auth/login');
    }
  }, [status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const email = session.user.email;
  if (status === 'authenticated' && email.split('@')[1] === 'ubc.ca') {
    return <>
    <h1> ADMIN PAGE 🤓 </h1>
      <QRGenerator />
    </>; // This will need adjustment since it's just a prototype
  }

  return <>
    You are not authenticated <br />
    <button onClick={ () => Router.push('/') }>Home</button>
  </>;

};

export default Admin;
