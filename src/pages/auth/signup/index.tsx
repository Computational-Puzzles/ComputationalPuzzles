import React, {useEffect, useState} from 'react';
import {useSession, signOut} from "next-auth/react";
import {useRouter} from "next/router";
import Router from "next/router";
import {signUp} from "../../../services";
import {Logo} from "../../../components/Global";

const SignUpPage = () => {
    const { data: session, status } = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); //is this a bad idea?
    const [repeatPw, setRepeatPw] = useState(''); //is this a bad idea?

    console.log('session ',  session);
    const handleSignUp = (event) =>{
        //condition1: if the user is already logged in, alert: you want to make a new account? if yes>, if no>
        //condition2: if pw != repeated pw, retype plz
        if(password !== repeatPw){
            alert('password and repeated password do not match. please try retyping both.');
            return;
        }
        if(session) {
            if(!window.confirm('Do you like to make another account?'))
                event.preventDefault();
            else
                signOut({redirect: false});
        } else{
            signUp({email,password});
            // Router.push('/auth/login');

        }

    }
  return (
      <div>
          <Logo showMark={true} showType={true}/>
          <h1>Sign Up Page</h1>
          <form onSubmit={ ()=>handleSignUp(event)}>
              <input type={'text'} placeholder={'Email'} onChange={ (event)=> setEmail(event.target.value)}/>
              <br/>
              <input type={'password'} placeholder={'Password'} onChange={ (event)=> setPassword(event.target.value)}/>
              <br/>
              <input type={'password'} placeholder={'Repeat password'} onChange={ (event)=> setRepeatPw(event.target.value)}/>
              <br/>
              <button type='submit'>Sign Up</button>
          </form>
          <a href={'/auth/login'}>login page</a>


      </div>
  );

};

export default SignUpPage;
