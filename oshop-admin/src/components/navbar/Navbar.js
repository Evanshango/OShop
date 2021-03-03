import React from 'react';
import styles from './Navbar.module.css'
import MenuIcon from '@material-ui/icons/Menu'
import PersonIcon from '@material-ui/icons/PersonOutline';

function Navbar({openSidebar, sidebarOpen}) {

    return (
        <nav className={styles.navbar}>
            <div className={styles.nav_icon} onClick={() => openSidebar()}>
                <MenuIcon/>
            </div>
            <div className={styles.navbar_right}>
                <a href="#">
                    <PersonIcon/>
                </a>
            </div>
        </nav>
    );
}

export default Navbar;