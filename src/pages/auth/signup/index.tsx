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
    const passwordMinLength = 8;

    console.log('session ',  session);
    const handleSignUp = (event) =>{
        //condition1: if the user is already logged in, alert: you want to make a new account? if yes>, if no>
        //condition2: if pw != repeated pw, retype plz
        if(password !== repeatPw){
            alert('password and repeated password do not match. please try retyping both.');
            event.preventDefault();
            return false;
        }
        if(status === 'authenticated') {
            if(window.confirm('Would you like to make another account?'))
                window.alert('Please log out before you make an other account.');
            event.preventDefault();
            return false;
        } else{
            signUp({email,password});
            event.preventDefault();
            Router.push('/auth/login');
        }

    }
  return (
      <div>
          <Logo showMark={true} showType={true}/>
          <h1>Sign Up Page</h1>
          <form onSubmit={ ()=>handleSignUp(event)}>
              <input type={'email'} placeholder={'Email'} onChange={ (event)=> setEmail(event.target.value)}/>
              <br/>
              <input type={'password'} placeholder={'Password'} minLength={passwordMinLength} onChange={ (event)=> setPassword(event.target.value)}/>
              <br/>
              <input type={'password'} placeholder={'Repeat password'} minLength={passwordMinLength} onChange={ (event)=> setRepeatPw(event.target.value)}/>
              <br/>
              <button type='submit'>Sign Up</button>
          </form>
          <a href={'/auth/login'}>login page</a>


      </div>
  );

};

export default SignUpPage;
