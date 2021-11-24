import React, {useState} from 'react';
import {NextApiRequest, NextApiResponse} from "next";
import {getProviders, signIn, getSession, getCsrfToken, useSession, signOut} from "next-auth/react"
import {getToken} from "next-auth/jwt";
// import {jwtSecret} from "../../../../config";
import { env } from '../../../../next.config.js';
import {Logo} from "../../../components/Global";
import {session} from "next-auth/server/routes";


export default function LoginPage({ providers, csrfToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); //is this a bad idea?
    const {data: session, status}= useSession();
    const passwordMinLength = 8;

    console.log(session);
    const handleLogin = (event)=>{
        if(email.length === 0)
            signIn("google");
        else
            signIn("credentials", {email: email, password: password });
    }
    const loginWithCredentials = (event) =>{
        //check1: password length & email format >>input attributes are doing for me
        // if(password.length < 8){
        //     alert('Password has minimum length of 8. Please try retyping your password.');
        //     event.preventDefault();
        //     return false;
        // }

        //check2: incorrect email or password:(error page) https://next-auth.js.org/providers/credentials
        // if(){
        //     event.preventDefault();
        //     return false;
        // }else
            signIn("credentials", {email: email, password: password });
    }
    const loginWithGoogle = (event) =>{
        signIn("google");
    }
  return (
      <div>

        <Logo showMark={true} showType={true}/>
        <h1>Login</h1>
          <form onSubmit={ ()=>loginWithCredentials(event)/*event => event.preventDefault()*/}>
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

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const {req, res} = context;
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