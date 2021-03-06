import React from 'react';
import { useSession } from 'next-auth/react';
import { Button, Logo, LogStatusButton } from '../../Global';
import headerStyles from './Header.module.scss';
import productStyles from '../../../styles/pages/Product.module.scss';

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <header className={headerStyles.header}>
        <div className={`${productStyles.wrapper} ${headerStyles.content}`}>
          <Logo showMark={true} showType={true} link={true} />
          <div className={headerStyles.actions}>
            <LogStatusButton status={status} useLogIn={false} />
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
