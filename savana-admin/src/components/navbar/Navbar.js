import React from 'react';
import styles from './Navbar.module.css'
import MenuIcon from '@material-ui/icons/Menu'
import SignOutDialog from "./SignOutDialog";

function Navbar({openSidebar, user}) {
    return (
        <nav className={styles.navbar}>
            <div className={styles.nav_icon} onClick={() => openSidebar()}>
                <MenuIcon/>
            </div>
            <SignOutDialog user={user}/>
        </nav>
    );
}

export default Navbar;