import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { signUp } from '../../../services';
import { Logo, Input, Button } from '../../../components/Global';
import styles from '../../../styles/pages/signup.module.scss';

const SignUpPage = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPw, setRepeatPw] = useState('');
  const passwordMinLength = 8;

  const handleSignUp = event => {
    event.preventDefault();
    if (password !== repeatPw) {
      toast('Password and repeated password do not match! Please try retyping both.', {
        icon: '⚠️',
        duration: 3000,
      })
      return false;
    }
    if (status === 'authenticated') {
      toast((t) => (
        <span style={ { display: 'flex', flexDirection: 'column' } }>
          <b>This email has already been used.</b>
          <p style={{ fontSize: '.8rem', marginTop: '-.1rem' }}>You might want to change your email</p>
          <div style={ { display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '-.5rem' } }>
            <button style={ { height: '1.8rem', width: '3rem', fontSize: '.8rem', borderRadius: '.5rem' } } onClick={ () => {
              toast.dismiss(t.id);
            } }>OK</button>
          </div>
        </span>
      ));
      return false;
    } else {
      signUp({ email, password });
      event.preventDefault();
      Router.push('/auth/login');
    }
  };
  return (
    <main className={ styles.signup }>
      <Logo showMark={ true } showType={ true } link={ true } />
      <h2 className={ styles.title }>Sign Up</h2>
      <form
        className={ styles.signupSection }
        onSubmit={ event => handleSignUp(event) }
      >
        <Input
          type={ 'email' }
          id={ 'email' }
          required={ true }
          placeholder={ 'Email' }
          setInputVal={ setEmail }
        />
        <Input
          type={ 'password' }
          id={ 'password' }
          required={ true }
          minLength={ passwordMinLength }
          placeholder={ 'Password' }
          setInputVal={ setPassword }
        />
        <Input
          type={ 'password' }
          id={ 'repeatPassword' }
          required={ true }
          minLength={ passwordMinLength }
          placeholder={ 'Repeat Password' }
          setInputVal={ setRepeatPw }
        />
        <a className={ styles.link } href={ '/auth/login' }>
          Already have an account?
        </a>
        <div className={ styles.buttonContainer }>
          <Button style={ 'primary' } content={ 'Sign Up' } type={ 'submit' } onClick={ () => { } } />
        </div>
      </form>
      <Toaster />
    </main>
  );
};

export default SignUpPage;
