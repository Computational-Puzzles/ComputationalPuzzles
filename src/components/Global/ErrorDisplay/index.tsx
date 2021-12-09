import * as React from 'react';
import styles from './ErrorDisplay.module.scss';
import Router from 'next/router';
import { Logo } from '../';

const ErrorDisplay = ({
  errorCode,
  message
}: {
  errorCode: number;
  message: string;
}) => {
  return (
    <div className={styles.center}>
      <div className={styles.contentWrapper}>
<<<<<<< HEAD
        <div className={styles.logo} onClick={ () => Router.push('/') }>
          <Logo showMark={true} showType={true} />
=======
        <div className={styles.logo}>
          <Logo showMark={true} showType={true} link={true} />
>>>>>>> de6a15f60f1b0aeb07ec61aa0d468ca11113452e
        </div>
        <div className={styles.textWrapper}>
          <p className={styles.errorCode}> Error {errorCode} </p>
          <p className={styles.msg}> {message} </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
