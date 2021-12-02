import React from 'react';
import Image from 'next/image';
import logo from '../../../../public/assets/logo.jpg';
import logoStyles from './Logo.module.scss';
import { LogoProps } from '../../../types/global';

const Logo = ({ showMark, showType }: LogoProps) => {
  return (
    <div className={logoStyles.logo}>
      <div className={logoStyles.mark}>
        {showMark && (
          <Image
            src={logo}
            alt={'computational puzzles logo'}
            layout={'responsive'}
          />
        )}
      </div>
      {showType && (
        <span className={logoStyles.type}>Computational Puzzles for Kids</span>
      )}
    </div>
  );
};

export default Logo;
