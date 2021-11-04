import * as React from 'react';
import styles from './Header.module.scss';

import { Logo } from '..';

type HeaderProps = {
  profilePicture?: string;
};

const Header = ({ profilePicture }: HeaderProps) => {
  const [activeTab, setActiveTab] = React.useState<0 | 1>(0);

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Logo showMark={true} showType={true} />
          <div className={styles.tabs}>
            <button
              className={activeTab === 0 && styles.active}
              onClick={() => setActiveTab(0)}
            >
              <span>Puzzles Map</span>
            </button>
            <button
              className={activeTab === 1 && styles.active}
              onClick={() => setActiveTab(1)}
            >
              <span>Puzzles List</span>
            </button>
          </div>
        </div>
        <div className={styles.right}>
          <button> Profile </button>
          {profilePicture ? (
            <img
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
