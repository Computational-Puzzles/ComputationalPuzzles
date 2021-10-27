import React from 'react';
import { Button, Logo } from '../../Global';
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
            <Button type={'flat'} content={'Login'} onClick={() => signIn()} />
            <Button
              type={'outline'}
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
