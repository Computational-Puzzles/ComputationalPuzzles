import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const userImage = `${session?.user?.image}#site.com/image.jpg`;

  return (
    <>
      <div>
        <h1>Profile</h1>
        { status === 'authenticated' ? (
          <>
            <h2>Information</h2>
            <p>
              <strong>Name:</strong> { session.user.name }
              <br />
              <strong>Email:</strong> { session.user.email }
              <br />
              { session.user.image && (
                <>
                  <strong>Profile image:</strong>
                  <Image
                    alt="profile image"
                    loader={ () => userImage }
                    src={ userImage }
                    width={ 200 }
                    height={ 200 }
                  />
                  <br />
                </>
              ) }
            </p>

            <h2>Reset password</h2>
            <form action="/api/auth/reset-password" method="post">
              <input type="hidden" name="email" value={ session?.user?.email } />
              <input
                type="password"
                name="oldPassword"
                placeholder="Old password"
                minLength={ 8 }
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New password"
                minLength={ 8 }
              />
              <input
                type="password"
                name="newPasswordConfirm"
                placeholder="Confirm new password"
                minLength={ 8 }
              />
              <button type="submit">Reset password</button>
            </form>
          </>
        ) : (
          <p>You are not logged in.</p>
        ) }
      </div>
    </>
  );
};

export default ProfilePage;
