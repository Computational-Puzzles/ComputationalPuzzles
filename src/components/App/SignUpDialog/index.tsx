import * as React from 'react';
import toast, { Toast } from 'react-hot-toast';
import styles from './SignUpDialog.module.scss';

const SignUpDialog = ({ t }: { t: Toast }) => {
  return (
    <span className={styles.wrapper}>
      <b>This email has already been used.</b>
      <p className={styles.dialogTitle}>
        Would you like to make another account?
      </p>
      <div className={styles.dialogBtn}>
        <button
          onClick={() => {
            toast.dismiss(t.id);
          }}
        >
          No
        </button>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            toast('Please log out before you make an other account', {
              icon: '⚠️',
              duration: 2000
            });
          }}
        >
          Yes
        </button>
      </div>
    </span>
  );
};

export default SignUpDialog;
