import React, { useRef } from 'react';
import Image from 'next/image';
import productStyles from '../Product.module.scss';
import landingStyles from './Landing.module.scss';
import logo from '../../../../public/assets/logo.png';
import jigsaw from '../../../../public/assets/puzzle_dots.svg';
import childImage1 from '../../../../public/assets/juliane-liebermann-unsplash.jpg';
import childImage2 from '../../../../public/assets/markus-spiske-unsplash.jpg';

const Landing = () => {
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
                <button>Start Hunting</button>
                <button onClick={learnMoreButton}>Learn More</button>
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
          <div className={`${landingStyles.content} ${landingStyles.contentLeft}`}>
            <p>
              As part of the Computational Thinking for Kids initiative,
              Computational Puzzles for Kids is a semi-online scavenger hunt
              that brings learning about computational thinking to the outdoors!
            </p>
            <div className={landingStyles.image}>
              <Image src={childImage1} alt={'child hiking with parent'} layout={'fill'} objectFit={'cover'} />
            </div>
          </div>
          <div className={`${landingStyles.content} ${landingStyles.contentRight}`}>
            <div className={landingStyles.image}>
              <Image src={childImage2} alt={'child hiking with parent'} layout={'fill'} objectFit={'cover'} />
            </div>
            <span>
              <p>
                This set of challenges is designed to lay the groundwork for
                various aspects of computational thinking, while also providing
                a great family outdoor activity in the process!
              </p>
              <p>
                As a hunter, you&apos;ll be searching for hidden boxes in the
                real world that lead you to various online challenges.
              </p>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
