import React, { useState, useEffect, useCallback } from 'react';
import styles from './Header.module.scss';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Logo, Sidebar } from '..';
import { HeaderProps } from '../../../types/global';
import { isAdmin } from '../../../services';
import { useSession } from 'next-auth/react';

const Header = ({ profilePicture }: HeaderProps) => {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const router = useRouter();
  const [validAdmin, setValidAdmin] = useState(false);
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    isAdmin({ email }).then(res => setValidAdmin(res));
  }, [email]);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const NavContent = useCallback(
    (displayMenu: boolean) => {
      return (
        <>
          <nav
            className={`${styles.tabs} ${displayMenu ? styles.tabs_menu : ''}`}
          >
            <Link href={'/puzzles/map'} passHref>
              <a
                className={
                  router.asPath === '/puzzles/map' ? styles.active : ''
                }
                onClick={() => setActiveTab(0)}
              >
                <span>Puzzles Map</span>
              </a>
            </Link>
            <Link href={'/puzzles'} passHref>
              <a
                className={router.asPath === '/puzzles' ? styles.active : ''}
                onClick={() => setActiveTab(1)}
              >
                <span>Puzzles List</span>
              </a>
            </Link>
          </nav>
          {validAdmin && (
            <Button style={'flat'} content={'Admin'} link={'/admin'} />
          )}
          <Button
            style={'outline'}
            content={'Profile'}
            link={'/auth/profile'}
          />
          {!displayMenu &&
            (profilePicture ? (
              <Image
                className={styles.profileImg}
                src={profilePicture}
                alt="profile"
              />
            ) : (
              <span className={styles.profileImg}> </span>
            ))}
        </>
      );
    },
    [validAdmin, router.asPath, profilePicture]
  );

  return (
    <div className={styles.header}>
      <Logo showMark={true} showType={true} link={true} />
      <div className={styles.header_content}>{NavContent(false)}</div>
      <button className={styles.header_menu__button} onClick={openMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <Sidebar sidebarOpen={menuOpen} setSidebarOpen={setMenuOpen}>
        <Logo showMark={true} showType={false} link={true} />
        {NavContent(true)}
      </Sidebar>
    </div>
  );
};

export default Header;
