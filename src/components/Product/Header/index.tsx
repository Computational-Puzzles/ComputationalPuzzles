import React from 'react';
import { useSession } from 'next-auth/react';
import { Button, Logo } from '../../Global';
import { signIn, signOut } from 'next-auth/react';
import headerStyles from './Header.module.scss';
import productStyles from '../../../styles/pages/Product.module.scss';

const LogStatusButton = ({ status }) => {
  return (
    status === 'authenticated' ? (
      <Button style={'flat'} content={'Logout'} onClick={() => signOut()} />
    ) : (
      <Button style={'flat'} content={'Login'} onClick={() => signIn()} />
    )
  )
}

const Header = () => {

  const { data: session, status } = useSession();

  return (
    <>
      <header className={headerStyles.header}>
        <div className={`${productStyles.wrapper} ${headerStyles.content}`}>
          <Logo showMark={true} showType={true} />
          <div className={headerStyles.actions}>
            <LogStatusButton status={status} />
            <Button
              style={'outline'}
              content={'Get Started'}
              arrowDirection={'right'}
              onClick={() => signIn()}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
