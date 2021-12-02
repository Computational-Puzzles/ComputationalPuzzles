import * as React from 'react';
import styles from './Header.module.scss';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Logo } from '..';
import { HeaderProps } from '../../../types/global';

const Header = ({ profilePicture }: HeaderProps) => {
  const [activeTab, setActiveTab] = React.useState<0 | 1>(0);
  const router = useRouter();

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Logo showMark={true} showType={true} link={true} />
          <div className={styles.tabs}>
            <Link href={'/puzzles/map'} passHref>
              <button
                className={router.asPath === '/puzzles/map' && styles.active}
                onClick={() => setActiveTab(0)}
              >
                <span>Puzzles Map</span>
              </button>
            </Link>
            <Link href={'/puzzles'} passHref>
              <button
                className={router.asPath === '/puzzles' && styles.active}
                onClick={() => setActiveTab(1)}
              >
                <span>Puzzles List</span>
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.right}>
          <Link href={'../auth/profile'}>Profile</Link>
          {profilePicture ? (
            <Image
              className={styles.profileImg}
              src={profilePicture}
              alt="profile"
            />
          ) : (
            <span className={styles.profileImg}> </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
