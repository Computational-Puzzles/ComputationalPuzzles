import * as React from 'react';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import { QRGenerator } from '../../components/App';
import { isAdmin } from '../../services/admin';

const Admin = () => {
  const { data: session, status } = useSession();
  const [validAdmin, setValidAdmin] = React.useState(false);

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
    checkAdmin();
  }, [email]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    if (validAdmin) {
      return (
        <>
          <h1> ADMIN PAGE 🤓 </h1>
          {/** TODO: Create Header for admin page  */ }
          <QRGenerator />
        </>
      );
    } else {
      Router.push('/403');
    }; // This will need adjustment since it's just a prototype
  }

  return (
    status === 'unauthenticated' && <>
      {/** TODO: Create Header for admin page  */ }
      You are not authenticated <br />
      <button onClick={ () => Router.push('/') }>Home</button>
    </>
  );
};

export default Admin;
