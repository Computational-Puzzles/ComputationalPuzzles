import React, { useState } from 'react';
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
  useSession
} from 'next-auth/react';
import { Logo, Input } from '../../../components/Global';
import { useRouter } from 'next/router';
import styles from '../../../styles/pages/login.module.scss';

export default function LoginPage({ providers, csrfToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); //is this a bad idea?
  const { data: session, status } = useSession();
  const passwordMinLength = 8;
  const { error } = useRouter().query;

  console.log(session);
  const loginWithCredentials = event => {
    signIn('credentials', { email: email, password: password });
  };
  const loginWithGoogle = event => {
    signIn('google');
  };
  return (
    <>
      <div className={styles.logoLogin}>
        <Logo showMark={true} showType={true} />
      </div>
      <div className={styles.mainSec}>
        <h2 className={styles.title}>Login</h2>
        {error && <SignInError error={error} />}
        <form>
          <div className={styles.inputContainer}>
            <Input
              type={'email'}
              id={'email'}
              required={false}
              placeholder={'Email'}
              setInputVal={setEmail}
            />
            <Input
              type={'password'}
              id={'password'}
              required={false}
              placeholder={'Password'}
              minLength={passwordMinLength}
              setInputVal={setPassword}
            />
          </div>
          <p className={styles.link}><a href={'/auth/signup'} >Don't have an account?</a></p>
          <div className={styles.container}>
            <button
              className={styles.button}
              onSubmit={() => loginWithCredentials(event)}
            >
              Sign in with Credentials
            </button>
            <button
              type={'button'}
              className={styles.button}
              onClick={() => loginWithGoogle(event)}
            >
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

const errors = {
  Signin: 'Try signing with a different account.',
  OAuthSignin: 'Try signing with a different account.',
  OAuthCallback: 'Try signing with a different account.',
  OAuthCreateAccount: 'Try signing with a different account.',
  EmailCreateAccount: 'Try signing with a different account.',
  Callback: 'Try signing with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Check your email address.',
  CredentialsSignin:
    'Sign in failed. Check the details you provided are correct.',
  default: 'Unable to sign in.',
};
const SignInError = ({ error }) => {
  const errorMessage = error && (errors[error] ?? errors.default);
  return <div>{errorMessage}</div>;
};

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  //const {req, res} = context;
  const session = await getSession(context);
  if (session) {
    //need to fix this, this is incorrect: blocks to reach this page no matter logged in or not
    console.log('Session', JSON.stringify(session, null, 2));
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  return {
    // session: undefined,
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(context)
    }
  };
}

/*
read files:
node_modules\next-auth\react\index.d.ts
    -getSession:
    -getCsrfToken
    -getProviders
    -signIn
    -signOut
    -SessionProvider
node_modules\next-auth\providers\index.d.ts
    -provider (type defined)
*/
