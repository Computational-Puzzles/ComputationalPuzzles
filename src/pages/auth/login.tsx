import React from 'react';
import styles from '../../styles/pages/login.module.scss';
import { Input, Logo } from '../../components/Global';

const Login = () => {
  const handleSubmit = e => {
    e.preventDefault();
    // check: username & password (need data frm db?)
  };

  return (
    <div >
      <div className={styles.logoLogin}>
        <Logo showMark={true} showType={true} />
      </div>
      <div className={styles.box1}>
        <h2 className={styles.box2}>Log In</h2>
        <form onSubmit={handleSubmit} >
          <div >
            <div className={styles.box3}>
              <Input
                  type={'text'}
                  id={'username'}
                  required={true}
                  placeholder={'Username'}
              />
            </div>
            <div className={styles.box3}>
              <Input
                  type={'password'}
                  id={'password'}
                  required={true}
                  placeholder={'Password'}
              />
            </div>
            <div className={styles.container}>
              {/*TODO: delete this tag or link to a password recovery page*/}
              <a href="#" >
                Forgot Password?
              </a>
              {/*TODO: change the link to the sign up page*/}
              <a href="#" >
                Do not have an account?
              </a>
            </div>
          </div>
          <button className={styles.button}> Log In</button>
        </form>
      </div>

    </div>
  );
};

export default Login;
