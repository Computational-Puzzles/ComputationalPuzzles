import { Button } from '../index';
import { signIn, signOut } from 'next-auth/react';
import React from 'react';
import { LogStatusButtonProps } from '../../../types/logStatusButton';

const LogStatusButton = ({ status, useLogIn }: LogStatusButtonProps) => {
  if (useLogIn) {
    return status === 'authenticated' ? (
        <Button style={'flat'} content={'Logout'} onClick={() => signOut()} />
    ) : (
        <Button style={'flat'} content={'Login'} onClick={() => signIn()} />
    );
  } else {
    return status === 'authenticated' ? (
        <Button style={'flat'} content={'Logout'} onClick={() => signOut()} />
    ) : (
        <Button style={'flat'} content={'Sign In'} link={'/auth/signup'} />
    );
  }
};

export default LogStatusButton;
