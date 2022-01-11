import React, { useEffect } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import { resetPassword } from '../../../services';
import {Header} from "../../../components/Global";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const userImage = `${session?.user?.image}#site.com/image.jpg`;
  const passwordMinLength = 8;

  const [oldPass, setOldPass] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');

  const handleChangePassword = async () => {
    const email = session?.user?.email;

    if (!email || !oldPass || !password || !confirmPass) return;
    if (password !== confirmPass) return;

    const success = await resetPassword({
      email,
      oldPassword: oldPass,
      newPassword: password
    });
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      Router.push('/auth/login');
    }
  }, [status]);

  return (
    <>
      <Header />
      <h1>Profile</h1>
      {status === 'authenticated' && (
        <>
          <h2>Information</h2>
          <p>
            <strong>Name:</strong> {session.user.name}
            <br />
            <strong>Email:</strong> {session.user.email}
            <br />
            {session.user.image && (
              <>
                <strong>Profile image:</strong>
                <Image
                  alt="profile image"
                  loader={() => userImage}
                  src={userImage}
                  width={200}
                  height={200}
                />
                <br />
              </>
            )}
          </p>

          <h2>Reset password</h2>
          <form>
            <input
              type="password"
              placeholder="Old password"
              value={oldPass}
              onChange={e => setOldPass(e.target.value)}
            />
            <input
              type="password"
              placeholder="New password"
              minLength={passwordMinLength}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              minLength={passwordMinLength}
              value={confirmPass}
              onChange={e => setConfirmPass(e.target.value)}
            />
            <button type='button' onClick={handleChangePassword}>Reset password</button>
          </form>
        </>
      )}
    </>
  );
};

export default ProfilePage;
