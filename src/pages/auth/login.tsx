import React from 'react';
import styles from '../../styles/pages/login.module.scss';
import { Input, Logo } from '../../components/Global';

const Login = () => {
  const handleSubmit = e => {
    e.preventDefault();
    // TODO: check username & password
  };

  return (
    <div>
      <div className={styles.logoLogin}>
        <Logo showMark={true} showType={true} />
      </div>
      <div className={styles.mainSec}>
        <h2 className={styles.title}>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div className={styles.inputs}>
              <Input
                type={'text'}
                id={'username'}
                required={true}
                placeholder={'Username'}
              />
            </div>
            <div className={styles.inputs}>
              <Input
                type={'password'}
                id={'password'}
                required={true}
                placeholder={'Password'}
              />
            </div>
            <div className={styles.container}>
              {/*TODO: delete this tag or link to a password recovery page*/}
              <a href="#">Forgot Password?</a>
              {/*TODO: change the link to the sign up page*/}
              <a href="#">Do not have an account?</a>
            </div>
          </div>
          <button className={styles.button}> Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
