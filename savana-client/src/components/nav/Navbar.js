import React, {useState} from 'react'
import styles from "./Navbar.module.css"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart} from "react-icons/ai"
import {clearAuthErrors} from "../../api"

function Navbar() {
    const dispatch = useDispatch()
    const {products: cart} = useSelector(state => state.cart)
    const {message} = useSelector(state => state.auth)
    const [click, setClick] = useState(false)
    const {token} = useSelector(state => state.auth)

    const handleClick = () => setClick(!click)
        // // if (message !== '') dispatch(clearAuthErrors())
        // if (message !== ''){
        //     console.log(message)
        // }


    const closeMobileMenu = () => {
        if (message !== '') dispatch(clearAuthErrors())
        setClick(false)
    }

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
    )
}

export default Navbar
