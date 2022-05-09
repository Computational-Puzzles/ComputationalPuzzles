import React, { useState } from 'react';
import { Button, Input, Logo } from '../../../components/Global';
import { useSession } from 'next-auth/react';
import { addBirthYear } from '../../../services/birthYear';
import styles from '../../../styles/pages/birthYear.module.scss';

const BirthYearPage = () => {
  //design it to look like sign-up page & say this is the last step for setting up the account
  const { data: session, status } = useSession();
  const [birthString, setBirthString] = useState('-1');

  const checkBirthYearRange = (birthInt: number) => {
    //TODO: add toaster to notify the user of typo
    if (birthInt > new Date().getFullYear()) return;
    if (birthInt <= new Date().getFullYear() - 100) return;
    return true;
  };
  const submitHandler = async () => {
    const email = session?.user?.email;
    if (!email) return;
    if (typeof birthString !== 'number') return;
    const birthInt = parseInt(birthString);
    if (checkBirthYearRange(birthInt) === false) return;

    await addBirthYear({
      birthYear: birthString,
      email: email
    });
  };
  return (
    <main className={styles.birthYearPage}>
      <Logo showMark={true} showType={true} link={true} />
      <h2 className={styles.title}>Birth Year</h2>
      {/*<p>This is the last step to finish user setup. You are almost there!!</p>*/}
      <form className={styles.inputSection}>
        <Input
          type={'text'}
          id={'birthYear'}
          required={true}
          pattern={'.{4}'}
          placeholder={'Enter birth year: yyyy'}
          setInputVal={setBirthString}
        />
        <Button
          style={'primary'}
          content={'Add Birth Year'}
          type={'submit'}
          onClick={submitHandler}
        />
      </form>
    </main>
  );
};
//TODO: redirect back to puzzle submission (or wherever user came from)
export default BirthYearPage;
