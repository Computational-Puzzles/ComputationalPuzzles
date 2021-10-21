import React from 'react';
import footerStyles from './Footer.module.scss';
import productStyles from '../Product.module.scss';

const Footer = () => {
  return (
    <footer className={footerStyles.footer}>
      <div className={`${productStyles.wrapper} ${footerStyles.content}`}>
        <div className={footerStyles.exploreMore}>
          <h2>Interested in exploring more?</h2>
          <button>Start Hunting</button>
        </div>
        <div className={footerStyles.links}>
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
      </div>
    </footer>
  );
};

export default Footer;
