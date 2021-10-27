import React from 'react';
import styles from '../../../styles/login.module.scss';
import { Input, Logo } from '../../components/Global';

const Login = () => {
  const handleSubmit = e => {
    e.preventDefault();
    // check: username & password (need data frm db?)
  };

  return (
    <div className={styles.loginPage}>
      <Logo showMark={true} showType={true} />
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            type={'text'}
            id={'username'}
            required={true}
            placeholder={'Username'}
          />
          <br />
          <Input
            type={'password'}
            id={'password'}
            required={true}
            placeholder={'Password'}
          />
          <br />
          <a href="#" className="left">
            Forgot Password?
          </a>
          <a href="#" className="right">
            Do not have an account?
          </a>
          <br />
        </div>
        <button> Log In</button>
      </form>
    </div>
  );
};

export default Login;
