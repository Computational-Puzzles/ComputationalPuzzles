import React, { useRef } from 'react';
import Image from 'next/image';
import productStyles from '../../../styles/pages/Product.module.scss';
import landingStyles from './LandingContent.module.scss';
import logo from '../../../../public/assets/logo.png';
import jigsaw from '../../../../public/assets/puzzle_dots.svg';
import childImage1 from '../../../../public/assets/juliane-liebermann-unsplash.jpg';
import childImage2 from '../../../../public/assets/markus-spiske-unsplash.jpg';
import { signIn } from 'next-auth/react';
import { Button } from '../../Global';

const LandingContent = () => {
  const whatIsThisRef = useRef(null);

  const learnMoreButton = () => {
    whatIsThisRef.current.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <main className={landingStyles.landing}>
      <section className={landingStyles.heading}>
        <div
          className={`${productStyles.wrapper} ${productStyles.sectionPadding}`}
        >
          <div className={landingStyles.backgroundImage}>
            <Image src={jigsaw} alt="jigsaw puzzle outline" />
          </div>
          <div className={landingStyles.content}>
            <div>
              <h1>
                Computational <br /> Puzzles for Kids
              </h1>
              <p>
                A scavenger hunt that brings computational thinking to the
                outdoors!
              </p>
              <div className={landingStyles.actions}>
                <Button
                  style={'primary'}
                  size={'lg'}
                  content={'Start Hunting'}
                  arrowDirection={'right'}
                  onClick={() => signIn()}
                />
                <Button
                  style={'secondary'}
                  size={'lg'}
                  content={'Learn More'}
                  arrowDirection={'down'}
                  onClick={learnMoreButton}
                />
              </div>
            </div>
            <div className={landingStyles.image}>
              <Image src={logo} alt="logo" />
            </div>
          </div>
        </div>
      </section>
      <div className={landingStyles.colorTransition1}>
        <div />
      </div>
      <div className={landingStyles.colorTransition2}>
        <div />
      </div>
      <section className={landingStyles.whatIsThis} ref={whatIsThisRef}>
        <div
          className={`${productStyles.wrapper} ${productStyles.sectionPadding}`}
        >
          <h2>What is this?</h2>
          <div
            className={`${landingStyles.content} ${landingStyles.contentLeft}`}
          >
            <p>
              As part of the Computational Thinking for Kids initiative,
              Computational Puzzles for Kids is a semi-online scavenger hunt
              that brings learning about computational thinking to the outdoors!
            </p>
            <div className={landingStyles.image}>
              <Image
                src={childImage1}
                alt={'child hiking with parent'}
                layout={'fill'}
                objectFit={'cover'}
              />
            </div>
          </div>
          <div
            className={`${landingStyles.content} ${landingStyles.contentRight}`}
          >
            <div className={landingStyles.image}>
              <Image
                src={childImage2}
                alt={'child stacking blocks'}
                layout={'fill'}
                objectFit={'cover'}
              />
            </div>
            <span>
              <p>
                These sets of challenges are designed to lay the groundwork for
                various aspects of computational thinking, while also providing
                a great family outdoor activity in the process!
              </p>
              <p>
                As a hunter, you&apos;ll be searching for qr codes in the real
                world that lead you to various online challenges.
              </p>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingContent;
