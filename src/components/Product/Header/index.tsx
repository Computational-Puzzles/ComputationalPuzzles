import React from 'react';
import { Button, Logo } from '../../Global';
import { signIn } from 'next-auth/react';
import headerStyles from './Header.module.scss';
import productStyles from '../../../styles/pages/Product.module.scss';
import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className={headerStyles.header}>
        <div className={`${productStyles.wrapper} ${headerStyles.content}`}>
          <Logo showMark={true} showType={true} link={true}/>
          <div className={headerStyles.actions}>
            <Button style={'flat'} content={'Login'} onClick={() => signIn()} />
            <Link href={'/puzzles/map'} passHref>
              <Button
                style={'outline'}
                content={'Get Started'}
                arrowDirection={'right'}
                onClick={() => null}
              />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
