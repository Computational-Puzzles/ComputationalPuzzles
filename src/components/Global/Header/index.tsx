import * as React from 'react';
import Image from 'next/image'

import logo from './logo.png';
import styles from './Header.module.scss';

type HeaderProps = {
    profilePicture?: string;
}

const Header = ({ profilePicture }: HeaderProps) => {
    const [activeTab, setActiveTab] = React.useState<0 | 1>(0);

    return (
        <div className={ styles.header }>
            <div className={ styles.content}>
                <div className={ styles.left }>
                    <>
                        <Image src={ logo } width={57} height={57} /> { /** This is a mock, change when there's logo component  */ }
                        <p>Computational Puzzles for Kids</p>
                    </>
                    <div className={ styles.tabs }>
                        <span className={ activeTab === 0 && styles.active } onClick={() => setActiveTab(0)}>
                            <p>Puzzles Map</p>
                        </span>
                        <span className={ activeTab === 1 && styles.active } onClick={() => setActiveTab(1)}>
                            <p>Puzzles List</p>
                        </span>
                    </div>
                </div>
                <div className={ styles.right }>
                    <button> Profile </button>
                    {   profilePicture
                        ? <img  className={ styles.profileImg } src={ profilePicture } alt="profile" />
                        : <span className={ styles.profileImg }> </span>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;
