import React, { MouseEventHandler } from 'react';
import MenuItem from './MenuItem';
import './NavBar.scss';
import SubMenuItem from './SubMenuItem';

const NavBar: React.FC = () => {
    const [toggle, setToggle] = React.useState<boolean>(false);
    const toggleMenu: MouseEventHandler<HTMLButtonElement> = () => {
        setToggle(!toggle);
    };
    return (
        <div className="navbar">
            <div className="navbar__container">
                <div className={`navbar__menu ${toggle ? 'active' : ''}`}>
                    <MenuItem title="SO FUNKTIONIERT'S" />
                    <MenuItem title="SONDERANGEBOTE" />
                    <MenuItem title="MEIN BEREICH">
                        <SubMenuItem title="My published jokes" />
                        <SubMenuItem title="My saved jokes" />
                        <SubMenuItem title="Account information" />
                        <SubMenuItem title="Publish new joke" />
                    </MenuItem>
                </div>
                <button
                    className={`bars-button ${toggle ? 'active' : ''}`}
                    onClick={toggleMenu}
                >
                    <i className="fa fa-bars"></i>
                </button>
            </div>
        </div>
    );
};

export default NavBar;
