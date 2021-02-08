import React, {useEffect, useState} from 'react';
import Link from 'next/link'
import {AiOutlineClose as CloseIcon, AiOutlineMenu as MenuIcon} from 'react-icons/ai'
import styles from './NavBar.module.css'
import {Button} from "../button/Button";
import {useSelector} from "react-redux";
import _ from 'lodash'

const NavBar = () => {

    const {user} = useSelector(state => state.user)
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)
    const [navbar, setNavbar] = useState(false)

    const handleClick = () => setClick(!click)

    const closeMobileMenu = () => setClick(false)

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }

    useEffect(() => {
        showButton()
        window.addEventListener('resize', showButton)
        window.addEventListener('scroll', changeBackground)
        return () => {
            window.removeEventListener('resize', showButton)
            window.removeEventListener('scroll', changeBackground)
        }
    }, [])

    return (
        <>
            <nav className={navbar ? `${styles.nav} ${styles.active}` : `${styles.nav}`}>
                <div className={styles.nav_container}>
                    <Link href={'/'} passHref>
                        <a>
                            <img className={styles.nav_logo} src={navbar ? '/logo3.png' : '/logo2.png'} alt="logo"/>
                        </a>
                    </Link>
                    <div className={styles.menu_icon} onClick={handleClick}>
                        {click ? <CloseIcon color={navbar ? '#ffffff' : '#111'}/> :
                            <MenuIcon color={navbar ? '#ffffff' : '#111'}/>}
                    </div>
                    <ul className={click ? `${styles.nav_menu} ${styles.active}` : `${styles.nav_menu}`}>
                        <li className={styles.nav_item}>
                            <Link href={'/'}>
                                <a className={!navbar ? `${styles.nav_links} ${styles.bg_white}` : `${styles.nav_links}`}
                                   onClick={closeMobileMenu}>Home</a>
                            </Link>
                        </li>
                        <li className={styles.nav_item}>
                            <Link href={'/products'}>
                                <a className={!navbar ? `${styles.nav_links} ${styles.bg_white}` : `${styles.nav_links}`}
                                   onClick={closeMobileMenu}>Products</a>
                            </Link>
                        </li>
                        <li className={styles.nav_item}>
                            <Link href={'/help'}>
                                <a className={!navbar ? `${styles.nav_links} ${styles.bg_white}` : `${styles.nav_links}`}
                                   onClick={closeMobileMenu}>Help</a>
                            </Link>
                        </li>
                        <li className={styles.nav_item}>
                            <Link href={'/cart'}>
                                <a className={!navbar ? `${styles.nav_links} ${styles.bg_white}` : `${styles.nav_links}`}
                                   onClick={closeMobileMenu}>Cart</a>
                            </Link>
                        </li>
                        {_.isEmpty(user) ? (
                            <li className={styles.nav_item}>
                                <Link href={'/account/signin'}>
                                    <a className={styles.nav_links_mobile} onClick={closeMobileMenu}>Signin</a>
                                </Link>
                            </li>
                        ) : (
                            <li className={styles.nav_item}>
                                <Link href={'/account'}>
                                    <a className={!navbar ? `${styles.nav_links} ${styles.bg_white}` : `${styles.nav_links}`}
                                       onClick={closeMobileMenu}>Account</a>
                                </Link>
                            </li>
                        )}
                    </ul>
                    {_.isEmpty(user) && button && <Button buttonStyle='btn_outline'>Signin</Button>}
                </div>
            </nav>
        </>
    );
}

export default NavBar;