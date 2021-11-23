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

    console.log(session);
  return (
      <div>
        <Logo showMark={true} showType={true}/>
        <h1>Login</h1>
          <input type={'text'} placeholder={'Email'} onChange={ (event)=> setEmail(event.target.value)}/>
          <br/>
          <input type={'text'} placeholder={'password'} onChange={ (event)=> setPassword(event.target.value)}/>
        {/*<form method="post" action="/api/auth/callback/credentials">*/}
        {/*  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />*/}
        {/*  <input type={'text'} placeholder={'Email'} onChange={ (event)=> setUsername(event.target.value)}/>*/}
        {/*  <br/>*/}
        {/*  <input type={'text'} placeholder={'password'} onChange={ (event)=> setUsername(event.target.value)}/>*/}
        {/*</form>*/}
        {/*{*/}
        {/*  Object.values(providers).map((provider) => (*/}


        {/*      <div key={provider.name}>*/}
        {/*        <p>{provider.name}</p> <p>{provider.id}</p>*/}
        {/*        <button onClick={() => signIn(provider.id)}>*/}
        {/*          Sign in with {provider.name}*/}
        {/*        </button>*/}

        {/*      </div>*/}
        {/*  ))}*/}
          <br/>
        <button onClick={ ()=> {const x = signIn("credentials", {email: email, password: password }); console.log(x);}}>Sign in with Credentials</button>
          <br/>
        <button onClick={ ()=> {const x = signIn("google"); console.log( x);}}>Sign in with Google</button>
          <br/>
          <a href={'/'}>home</a>
          <br/>
          <button onClick={ ()=> signOut()}>Sign out</button>
      </div>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const {JWT_SECRET} = env;
  // const secret = authSecret;
  const {req, res} = context;
  const session = await getSession({req});


  // If there is a session, a response, and a access token for this session,
  // this if-statement will redirect user back to home page (page/index.tsx)
  // so we don't run into the problem where users re-logging in again*n
  // if(session && res && getToken({req, secret})){
  //   res.writeHead(302, {
  //     Location: "/", //redirect back to home page
  //   });
  //   res.end()
  //   return;
  // }
   if (session) {
    return {
      redirect: { destination: "/" },
    };
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