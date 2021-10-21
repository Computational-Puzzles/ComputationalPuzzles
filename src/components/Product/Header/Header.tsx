import React from 'react';
import { Logo } from '../../Global';
import { signIn } from 'next-auth/react';
import headerStyles from './Header.module.scss';
import productStyles from '../Product.module.scss';

const Header = () => {
  return (
    <>
      <header className={headerStyles.header}>
        <div className={`${productStyles.wrapper} ${headerStyles.content}`}>
          <Logo showMark={true} showType={true} />
          <div className={headerStyles.actions}>
            <button onClick={() => signIn()}>Login</button>
            <button onClick={() => signIn()}>Get Started</button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
