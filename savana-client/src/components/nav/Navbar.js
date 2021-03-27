import React, {useState} from 'react';
import styles from "./Navbar.module.css";
import Search from "../search/Search";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart} from "react-icons/ai";

function Navbar() {
    const {products: cart} = useSelector(state => state.cart)
    const [click, setClick] = useState(false)
    const {token} = useSelector(state => state.auth)

    const handleClick = () => setClick(!click)

    const closeMobileMenu = () => setClick(false)

    return (
        <nav className={styles.nav}>
            <div className={styles.navigation}>
                <div className={styles.nav_center}>
                    <div className={styles.nav_header}>
                        <Link to={'/'}>
                            <span className={styles.nav_logo}>
                                <h1>OSHO<span>P</span></h1>
                            </span>
                        </Link>
                    </div>
                    <div className={styles.search_area}>
                        <Search/>
                    </div>
                    <ul className={click ? `${styles.nav_menu} ${styles.active}` : `${styles.nav_menu}`}>
                        <li className={styles.nav_item}>
                            <Link to={'/'}>
                                <span className={styles.nav_links} onClick={closeMobileMenu}>Home</span>
                            </Link>
                        </li>
                        <li className={styles.nav_item}>
                            <Link to={'/products'}>
                                <span className={`${styles.nav_links}`} onClick={closeMobileMenu}>Products</span>
                            </Link>
                        </li>
                        <li className={styles.nav_item}>
                            <Link to={'/account'}>
                                <span className={`${styles.nav_links} ${styles.acc}`} onClick={closeMobileMenu}>
                                    {token ? 'Account' : (
                                        <>
                                            <span>Signin</span>
                                            <hr/>
                                            <span>Signup</span>
                                        </>
                                    )}
                                </span>
                            </Link>
                        </li>
                        <li className={styles.nav_icon}>
                            <Link to={'/cart'}>
                                <button className={styles.nav_links} onClick={closeMobileMenu}>
                                    <AiOutlineShoppingCart/> {cart ? Object.keys(cart).length : 0}
                                </button>
                            </Link>
                        </li>
                    </ul>
                    <div className={styles.menu_icon} onClick={handleClick}>
                        {click ? <AiOutlineClose/> : <AiOutlineMenu/>}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;