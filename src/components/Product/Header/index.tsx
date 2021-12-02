import React from 'react';
import { Button, Logo } from '../../Global';
import { signIn } from 'next-auth/react';
import headerStyles from './Header.module.scss';
import productStyles from '../../../styles/pages/Product.module.scss';

const Header = () => {
  return (
    <>
      <header className={headerStyles.header}>
        <div className={`${productStyles.wrapper} ${headerStyles.content}`}>
          <Logo showMark={true} showType={true} link={true}/>
          <div className={headerStyles.actions}>
            <Button style={'flat'} content={'Login'} onClick={() => signIn()} />
            <Button
              style={'outline'}
              content={'Get Started'}
              arrowDirection={'right'}
              link={'/puzzles/map'}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
