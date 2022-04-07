import { Button } from '../index';
import { signIn, signOut } from 'next-auth/react';
import React from 'react';
import { LogStatusButtonProps } from '../../../types/logStatusButton';

const LogStatusButton = ({ status, usedInPage }: LogStatusButtonProps) => {
  if (usedInPage === 'home') {
    return status === 'authenticated' ? (
      <Button style={'flat'} content={'Logout'} onClick={() => signOut()} />
    ) : (
      <Button style={'flat'} content={'Sign In'} link={'/auth/signup'} />
    );
  } else {
    // usedInPage === 'others' or  usedInPage === 'undefined'
    return status === 'authenticated' ? (
      <Button style={'flat'} content={'Logout'} onClick={() => signOut()} />
    ) : (
      <Button style={'flat'} content={'Login'} onClick={() => signIn()} />
    );
  }
};

export default LogStatusButton;
