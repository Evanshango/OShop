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
                                <small className={styles.p1}>Savana</small>
                                <small><span>Treasures</span></small>
                            </span>
                        </Link>
                    </div>
                    <div className={styles.search_area}>
                        <Search/>
                    </div>
                    <ul className={click ? `${styles.nav_menu} ${styles.active}` : `${styles.nav_menu}`}>
                        <li className={styles.nav_item} onClick={closeMobileMenu}>
                            <Link to={'/'}>
                                <span className={styles.nav_links}>Home</span>
                            </Link>
                        </li>
                        <li className={styles.nav_item} onClick={closeMobileMenu}>
                            <Link to={'/products'}>
                                <span className={`${styles.nav_links}`}>Products</span>
                            </Link>
                        </li>
                        <li className={styles.nav_item} onClick={closeMobileMenu}>
                            <Link to={'/account'}>
                                <span className={`${styles.nav_links} ${styles.acc}`}>
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
                        <li className={styles.nav_icon} onClick={closeMobileMenu}>
                            <Link to={'/cart'}>
                                <button className={styles.nav_links}>
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
