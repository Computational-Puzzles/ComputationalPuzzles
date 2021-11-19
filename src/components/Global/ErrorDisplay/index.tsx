import * as React from 'react';
import styles from './ErrorDisplay.module.scss';
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
        <Logo showMark={true} showType={true} />
        <span className={styles.seperator} />
        <div className={styles.textWrapper}>
          <p className={styles.errorCode}> Error code: {errorCode} </p>
          <p className={styles.msg}> {message} </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
