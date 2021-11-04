import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../../public/assets/logo.jpg';
import logoStyles from './Logo.module.scss';

type LogoProps = {
  showMark: boolean;
  showType: boolean;
  link: boolean;
};

const Logo = ({ showMark, showType, link }: LogoProps) => {
  if (link) {
    return (
      <Link href={'/'} passHref>
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
            <span className={logoStyles.type}>
              Computational Puzzles for Kids
            </span>
          )}
        </div>
      </Link>
    );
  } else {
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
          <span className={logoStyles.type}>
            Computational Puzzles for Kids
          </span>
        )}
      </div>
    );
  }
};

export default Logo;
