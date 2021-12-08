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
        <div className={styles.logo} onClick={ () => Router.push('/') }>
          <Logo showMark={true} showType={true} />
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
