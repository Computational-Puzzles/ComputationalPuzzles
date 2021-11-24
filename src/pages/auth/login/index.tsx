import React, {useState} from 'react';
import {getProviders, signIn, getSession, getCsrfToken, useSession, signOut} from "next-auth/react"
import {Logo} from "../../../components/Global";
import {useRouter} from "next/router";


export default function LoginPage({ providers, csrfToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); //is this a bad idea?
    const {data: session, status}= useSession();
    const passwordMinLength = 8;
    const {error} = useRouter().query;

    console.log(session);
    const loginWithCredentials = (event) =>{
        //check1: password length & email format >>input attributes are doing for me
        //check2: incorrect email or password:(error page) https://next-auth.js.org/providers/credentials
            signIn("credentials", {email: email, password: password });
    }
    const loginWithGoogle = (event) =>{
        signIn("google");
    }
  return (
      <div>
          <Logo showMark={true} showType={true}/>
          <h1>Login</h1>
          {error && <SignInError error = {error} />}
          <form onSubmit={ ()=>loginWithCredentials(event)}>  {/*the purpose of this form is to check (1)email format (2)pw minLength*/}
              <input type={'email'} placeholder={'Email'} onChange={ (event)=> setEmail(event.target.value)}/>
              <br/>
              <input type={'password'} placeholder={'password'} minLength={passwordMinLength} onChange={ (event)=> setPassword(event.target.value)}/>
              <br/>
              <input type={'hidden'}/>
              <button >Sign in with Credentials</button>
          </form>
              <br/>
              <button onClick={ ()=> loginWithGoogle(event)}>Sign in with Google</button>
              <br/>
              <a href={'/'}>home</a>
              <br/>
              <button onClick={ ()=> signOut()}>Sign out</button>

      </div>
  )
}

const errors = {
    Signin: "Try signing with a different account.",
    OAuthSignin: "Try signing with a different account.",
    OAuthCallback: "Try signing with a different account.",
    OAuthCreateAccount: "Try signing with a different account.",
    EmailCreateAccount: "Try signing with a different account.",
    Callback: "Try signing with a different account.",
    OAuthAccountNotLinked:
        "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "Check your email address.",
    CredentialsSignin:
        "Sign in failed. Check the details you provided are correct.",
    default: "Unable to sign in.",
}
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
       console.log("Session", JSON.stringify(session, null, 2))
    return {
      redirect: {
          destination: "/",
          permanent: false,
      },
    }
  }
  return {
    // session: undefined,
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(context),
    },

  }
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