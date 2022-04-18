import * as React from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import {
  resetPassword,
  getUserByEmail,
  updateUsername
} from '../../../services';
import { Input, Button } from '../../../components/Global';
import { Header } from '../../../components/Product';
import styles from '../../../styles/pages/profile.module.scss';

const ProfilePage = () => {
  const passwordMinLength = 8;
  const { data: session, status } = useSession();

  const [hasPassword, setHasPassword] = useState(false);
  const [newUsername, setNewUserName] = useState('');
  const [username, setUsername] = useState('');
  const [userImg, setUserImg] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  useEffect(() => {
    if (!session) return;
    setUsername(session.user.name);
    setUserImg(session.user.image);
    setUserEmail(session.user.email);
  }, [session]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      Router.push('/auth/login');
    }
  }, [status]);

  useEffect(() => {
    getUserByEmail({ email: userEmail })
      .then(user => {
        if (user?.password) setHasPassword(true);
        if (user.name) setUsername(user.name);
      })
      .catch(err => {
        toast.error(err.message);
      });
  }, [userEmail]);

  const handleChangePassword = async () => {
    if (!userEmail || !oldPass || !password || !confirmPass) return;
    if (password !== confirmPass) return;
    try {
      await toast.promise(
        resetPassword({
          email: userEmail,
          oldPassword: oldPass,
          newPassword: password
        }),
        {
          loading: 'Changing password',
          success: 'Password changed successfully',
          error: err => `Error: ${err.message}`
        }
      );
    } catch (err) {
      toast.error(err);
    }
  };

  const handleUpdateUsername = async () => {
    // TODO: Regex for username
    if (newUsername === '') {
      toast.error('Username cannot be empty');
      return;
    }

    if (newUsername === username) {
      toast.error('Username cannot be the same as current username');
      return;
    }

    toast.promise(
      updateUsername({
        email: userEmail,
        username: newUsername
      }),
      {
        loading: 'Updating username',
        success: () => {
          setUsername(newUsername);
          return 'Username updated successfully';
        },
        error: err => `Error: ${err.message}`
      }
    );
  };

  return (
    <div className={styles.profileWrapper}>
      <Header />
      <h2>{username || userEmail}</h2>
      <hr />
      {status === 'authenticated' && (
        <div className={styles.profileDetailsWrapper}>
          <h3>Info</h3>
          <div className={styles.profileDetails}>
            {userImg ? (
              <Image
                alt="profile image"
                loader={() => userImg}
                src={userImg}
                width={200}
                height={200}
              />
            ) : (
              <div className={styles.imgPlaceholder}></div>
            )}
            <div className={styles.profileDetailsText}>
              <div className={styles.profileDetailsInfo}>
                <span>Email:</span>
                <div>{userEmail}</div>
              </div>
              <div className={styles.profileDetailsInfo}>
                <span>Username:</span>
                <Input
                  type="text"
                  id="username"
                  placeholder={username || 'Enter username...'}
                  required={false}
                  setInputVal={setNewUserName}
                />
                <Button
                  onClick={async () => await handleUpdateUsername()}
                  style="primary"
                  content="Update"
                  arrowDirection="right"
                />
              </div>
              <div className={styles.profileDetailsInfo}>
                <span>Birth year:</span>
                {/* TODO: Load birthyear */}
                <Input
                  type="number"
                  id="birthyear"
                  placeholder={''}
                  required={false}
                />
                <Button
                  onClick={() => toast('Coming soon ✨')}
                  style="primary"
                  content="Update"
                  arrowDirection="right"
                />
              </div>
            </div>
          </div>
          {hasPassword && (
            <div className={styles.resetPasswordFormWrapper}>
              <h3>Reset password</h3>
              <form className={styles.resetPasswordForm}>
                <Input
                  id="oldPassword"
                  type="password"
                  placeholder="Old password"
                  setInputVal={setOldPass}
                  required={true}
                />
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="New password"
                  minLength={passwordMinLength}
                  setInputVal={setPassword}
                  required={true}
                />
                <Input
                  id="confirmNewPassword"
                  type="password"
                  placeholder="Confirm new password"
                  minLength={passwordMinLength}
                  setInputVal={setConfirmPass}
                  required={true}
                />
                <div>
                  <Button
                    onClick={handleChangePassword}
                    style="primary"
                    content="Reset"
                    arrowDirection="right"
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
