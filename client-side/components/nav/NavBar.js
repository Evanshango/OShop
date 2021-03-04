import React, {useState} from 'react';
import Link from 'next/link'
import styles from './NavBar.module.css'
import {AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart, AiOutlineUser} from "react-icons/ai";
import {useSelector} from "react-redux";

const NavBar = () => {

    const {products: cart} = useSelector(state => state.cart)
    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click)

    const closeMobileMenu = () => setClick(false)

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
                    <ul className={click ? `${styles.nav_menu} ${styles.active}` : `${styles.nav_menu}`}>
                        <li className={styles.nav_item}>
                            <Link href={'/'}>
                                <a className={styles.nav_links} onClick={closeMobileMenu}>Home</a>
                            </Link>
                        </li>
                        <li className={styles.nav_item}>
                            <Link href={'/featured'}>
                                <a className={styles.nav_links} onClick={closeMobileMenu}>Featured</a>
                            </Link>
                        </li>
                        <li className={styles.nav_item}>
                            <Link href={'/products'}>
                                <a className={`${styles.nav_links}`} onClick={closeMobileMenu}>Products</a>
                            </Link>
                        </li>
                        <li className={styles.nav_item}>
                            <Link href={'/about'}>
                                <a className={styles.nav_links} onClick={closeMobileMenu}>About Us</a>
                            </Link>
                        </li>
                    </ul>
                    <div className={styles.nav_icons}>
                        <li className={styles.nav_icon}>
                            <Link href={'/cart'}>
                                <a className={styles.nav_links} onClick={closeMobileMenu}>
                                    <AiOutlineUser size={26}/>
                                </a>
                            </Link>
                        </li>
                        <li className={styles.nav_icon}>
                            <Link href={'/cart'}>
                                <a className={styles.nav_links} onClick={closeMobileMenu}>
                                    <span className={styles.cart}>
                                        <AiOutlineShoppingCart size={26}/><h4>{cart.length}</h4>
                                    </span>
                                </a>
                            </Link>
                        </li>
                        <div className={styles.menu_icon} onClick={handleClick}>
                            {click ? <AiOutlineClose/> : <AiOutlineMenu/>}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;