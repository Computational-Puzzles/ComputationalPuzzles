import React, { useEffect } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { resetPassword } from '../../../services';
import { Header, Input, Button } from '../../../components/Global';
import styles from '../../../styles/pages/profile.module.scss';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [username, setUsername] = React.useState('');
  const [userImg, setUserImg] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const passwordMinLength = 8;

  const [oldPass, setOldPass] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');

  const handleChangePassword = async () => {
    if (!userEmail || !oldPass || !password || !confirmPass) return;
    if (password !== confirmPass) return;
    try {
      await toast.promise(resetPassword({
        email: userEmail,
        oldPassword: oldPass,
        newPassword: password
      }), {
        loading: 'Changing password',
        success: 'Password changed successfully',
        error: (err) => `Error: ${err.message}`
      })
    } catch (err) {
      console.error(err);
    }
  };

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

  return (
    <div className={styles.profileWrapper}>
      <Header />
      <h2>{username || userEmail}</h2>
      <hr />
      {status === 'authenticated' && (
        <div className={styles.profileDetailsWrapper}>
          <h3>Info</h3>
          <div className={styles.profileDetails}>
            {userImg ? <Image
              alt="profile image"
              loader={() => userImg}
              src={userImg}
              width={200}
              height={200}
            /> : <div className={styles.imgPlaceholder}></div>
            }
            <div className={styles.profileDetailsText}>
              <div className={styles.profileDetailsInfo}>
                <span>Email:</span>
                <div>
                  {userEmail}
                </div>
              </div>
              <div className={styles.profileDetailsInfo}>
                <span>Username:</span>
                <Input type='text' id='username' placeholder={username || ''} required={false} />
                <Button
                  onClick={() => alert('Hi')}
                  style='primary'
                  content='Update'
                  arrowDirection='right'
                />
              </div>
              <div className={styles.profileDetailsInfo}>
                <span>Birth year:</span>
                {/* TODO: Load birthyear */}
                <Input type='text' id='birthyear' placeholder={''} required={false} />
                <Button
                  onClick={() => alert('Hi')}
                  style='primary'
                  content='Update'
                  arrowDirection='right'
                />
              </div>
            </div>
          </div>

          <div className={styles.resetPasswordFormWrapper}>
            <h3>Reset password</h3>
            <form className={styles.resetPasswordForm}>
              <Input
                id='oldPassword'
                type="password"
                placeholder="Old password"
                setInputVal={setOldPass}
                required={true}
              />
              <Input
                id='newPassword'
                type="password"
                placeholder="New password"
                minLength={passwordMinLength}
                setInputVal={setPassword}
                required={true}
              />
              <Input
                id='confirmNewPassword'
                type="password"
                placeholder="Confirm new password"
                minLength={passwordMinLength}
                setInputVal={setConfirmPass}
                required={true}
              />
              <div>
                <Button
                  onClick={handleChangePassword}
                  style='primary'
                  content='Reset'
                  arrowDirection='right'
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
