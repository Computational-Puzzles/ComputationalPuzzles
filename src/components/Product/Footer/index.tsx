import React from 'react';
import Image from 'next/image';
import footerStyles from './Footer.module.scss';
import productStyles from '../Product.module.scss';
import { signIn } from 'next-auth/react';
import { Button } from '../../Global';
import ubcLogoFullBlack from '../../../../public/assets/UBC-logo-full-black.png';

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={`${productStyles.wrapper} ${footerStyles.content}`}>
        <div className={footerStyles.exploreMore}>
          <h2>Interested in exploring more?</h2>
          <Button
            type={'primary'}
            content={'Start Hunting'}
            arrowDirection={'right'}
            onClick={() => signIn()}
          />
        </div>
        <div className={footerStyles.details}>
          <span>
            Developed by: Dr. Bowen Hui, Opey Adeyemi, Mathew de Vin, Kiet Phan,
            Lydia Lin
          </span>
          <div className={footerStyles.actions}>
            <a
              href={'https://github.com/Computational-Puzzles'}
              target={'_blank'}
              rel={'noopener noreferrer'}
            >
              Contact Us
            </a>
            <a
              href={
                'https://github.com/Computational-Puzzles/ComputationalPuzzles'
              }
              target={'_blank'}
              rel={'noopener noreferrer'}
            >
              View the Github
            </a>
          </div>
        </div>
        <div className={footerStyles.ubcLogo}>
          <Image src={ubcLogoFullBlack} alt={'University of British Columbia Logo'} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
