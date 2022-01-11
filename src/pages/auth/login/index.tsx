import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
  useSession
} from 'next-auth/react';
import { Logo, Input, Button } from '../../../components/Global';
import { useRouter } from 'next/router';
import styles from '../../../styles/pages/login.module.scss';

export default function LoginPage({ providers, csrfToken }) {
  const { data: session, status } = useSession();
  const passwordMinLength = 8;
  const { error } = useRouter().query;

  const loginWithGoogle = () => {
    signIn('google').then(r => {
      // TODO: save session into db (?)
      console.log('Signed in with Google');
    });
  };
  return (
    <main className={styles.login}>
      <Logo showMark={true} showType={true} link={true} />
      <h1 className={styles.title}>Log In</h1>
      {error && <SignInError error={error} />}
      <form
        className={styles.loginSection}
        method="post"
        action={'/api/auth/callback/credentials'}
      >
        {/*TODO: save session into db*/}
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
        <a className={styles.link} href={'/auth/signup'}>
          Don&apos;t have an account?
        </a>
        <div className={styles.buttonContainer}>
          <Button
            style={'primary'}
            content={'Log In'}
            type={'submit'}
            onClick={() => {}}
          />
          <Button
            style={'secondary'}
            content={'Log In With Google'}
            onClick={() => loginWithGoogle()}
          />
        </div>
      </form>
    </main>
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
