import React, {useState} from 'react';
import Link from 'next/link'
import styles from './NavBar.module.css'
import {AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart} from "react-icons/ai";
import {useSelector} from "react-redux";
import Search from "../search/Search";

const NavBar = () => {

    const {products: cart} = useSelector(state => state.cart)
    const [click, setClick] = useState(false)
    const {token} = useSelector(state => state.user)

    const handleClick = () => setClick(!click)

    const closeMobileMenu = () => setClick(false)

    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.navigation}>
                <div className={styles.nav_center}>
                    <div className={styles.nav_header}>
                        <Link href={'/'} passHref>
                            <a className={styles.nav_logo}>
                                <h1>OSHO<span>P</span></h1>
                            </a>
                        </Link>
                    </div>
                    <div className={styles.search_area}>
                        <Search/>
                    </div>
                    <ul className={click ? `${styles.nav_menu} ${styles.active}` : `${styles.nav_menu}`}>
                        <li className={styles.nav_item}>
                            <Link href={'/'}>
                                <a className={styles.nav_links} onClick={closeMobileMenu}>Home</a>
                            </Link>
                        </li>
                        <li className={styles.nav_item}>
                            <Link href={'/products'}>
                                <a className={`${styles.nav_links}`} onClick={closeMobileMenu}>Products</a>
                            </Link>
                        </li>
                        <li className={styles.nav_item}>
                            <Link href={'/account'}>
                                <a className={styles.nav_links} onClick={closeMobileMenu}>
                                    {token ? 'Account' : (
                                        <>
                                            <span>Signin</span>
                                            <hr/>
                                            <span>Signup</span>
                                        </>
                                    )}
                                </a>
                            </Link>
                        </li>
                        <li className={styles.nav_icon}>
                            <Link href={'/cart'}>
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

export default NavBar;