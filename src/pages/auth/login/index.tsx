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
  const { data: session, status } = useSession();
  const passwordMinLength = 8;
  const { error } = useRouter().query;

  const loginWithGoogle = event => {
    signIn('google');
    // TODO: save session into db
  };
  return (
    <>
      <div className={styles.logoLogin}>
        <Logo showMark={true} showType={true} />
      </div>
      <div className={styles.mainSec}>
        <h2 className={styles.title}>Login</h2>
        {error && <SignInError error={error} />}
        <form method="post" action="/api/auth/callback/credentials"> {/*TODO: save session into db*/}
          <div className={styles.inputContainer}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <Input
              type={'email'}
              id={'email'}
              required={true}
              placeholder={'Email'}
            />
            <Input
              type={'password'}
              id={'password'}
              required={true}
              minLength={passwordMinLength}
              placeholder={'Password'}
            />
          </div>
          <p className={styles.link}>
            <a href={'/auth/signup'}>Do not have an account?</a>
          </p>
          <div className={styles.container}>
            <button
              type='submit'
              className={styles.button}
            >
              Sign in with Credentials
            </button>
            <button
              type='button'
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
  default: 'Unable to sign in.'
};
const SignInError = ({ error }) => {
  const errorMessage = error && (errors[error] ?? errors.default);
  return <div>{errorMessage}</div>;
};

export async function getServerSideProps(context) {
  //const {req, res} = context;
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  return {
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
