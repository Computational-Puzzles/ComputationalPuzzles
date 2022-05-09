import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/assets/logo.jpg';
import logoStyles from './Logo.module.scss';
import type { LogoProps } from '../../../types/global';

const LogoContent = ({ showMark, showType }: LogoProps) => {
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

const Logo = ({ showMark, showType, link }: LogoProps) => {
  if (link) {
    return (
      <Link href={'/'} passHref>
        <a>
          <LogoContent showMark={showMark} showType={showType} />
        </a>
      </Link>
    );
  } else {
    return <LogoContent showMark={showMark} showType={showType} />;
  }
};

export default Logo;
