import * as React from 'react';

import './Header.component.scss';

type HeaderProps = {
    profilePicture?: string;
}

const Header = ({ profilePicture }: HeaderProps) => {
    return (
        <div className="header">
            <div className="header-title">
               Computational Puzzles for Kids 
            </div>
            <div className="profile-wrap">
                Profile
            </div>
        </div>
    );
}

export default Header;
