import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { signUp } from '../../../services';
import { Logo,Input } from '../../../components/Global';
import styles from "../../../styles/pages/signup.module.scss";

const SignUpPage = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPw, setRepeatPw] = useState('');
  const passwordMinLength = 8;

  console.log('session ', session);
  const handleSignUp = event => {
    if (password !== repeatPw) {
      alert(
        'password and repeated password do not match. please try retyping both.'
      );
      event.preventDefault();
      return false;
    }
    if (status === 'authenticated') {
      if (window.confirm('Would you like to make another account?'))
        window.alert('Please log out before you make an other account.');
      event.preventDefault();
      return false;
    } else {
      signUp({ email, password });
      event.preventDefault();
      Router.push('/auth/login');
    }
  };
  return (
    <>
      <div className={styles.logoLogin}>
        <Logo showMark={true} showType={true} />
      </div>
      <div className={styles.mainSec}>
        <h2 className={styles.title}>Sign Up Page</h2>
        <form onSubmit={() => handleSignUp(event)}>
          <div className={styles.inputContainer}>
            <Input type={'email'} id={'email'} required={true} placeholder={'Email'} setInputVal={setEmail}/>
            <Input type={'password'} id={'password'} required={true} minLength={passwordMinLength} placeholder={'password'} setInputVal={setPassword}/>
            <Input type={'password'} id={'repeatPassword'} required={true} minLength={passwordMinLength} placeholder={'repeat password'} setInputVal={setRepeatPw}/>
          </div>
          <p className={styles.link}><a href={'/auth/login'} >Already have an account?</a></p>
          <button type="submit" className={styles.button}>Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
