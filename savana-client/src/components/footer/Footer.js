import React from 'react';
import {FaFacebook as Facebook, FaInstagram as Instagram} from "react-icons/fa";
import {AiOutlineTwitter as Twitter} from "react-icons/ai";
import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer_container}>
            <div className={styles.footer_wrapper}>
                <div className={styles.footer_top}>
                    <div className={styles.footer_top_box}>
                        <h3>EXTRAS</h3>
                        <a href="/">Brands</a>
                        <a href="/">Gift Certificates</a>
                        <a href="/">Affiliates</a>
                        <a href="/">Specialists</a>
                    </div>
                    <div className={styles.footer_top_box}>
                        <h3>INFORMATION</h3>
                        <a href="/">About Us</a>
                        <a href="/">Privacy Policy</a>
                        <a href="/">Terms & Conditions</a>
                        <a href="/">Newsletter</a>
                    </div>
                    <div className={styles.footer_top_box}>
                        <h3>MY ACCOUNT</h3>
                        <a href="/">Profile</a>
                        <a href="/">Order History</a>
                        <a href="/">Wishlist</a>
                    </div>
                    <div className={styles.footer_top_box}>
                        <h3>CONTACT US</h3>
                        <a href="/" className={styles.text_wrap}>Unknown Street, 2121, Nairobi, Kenya</a>
                        <a href="/">anonymous@oshop.com</a>
                        <a href="/">+254 712 345 678</a>
                        <a href="/">Returns</a>
                    </div>
                </div>
                <div className={styles.footer_copyright}>
                    <div className={styles.social_media}>
                        <a href='/' target='_blank' rel='noreferrer'>
                            <Facebook/>
                        </a>
                        <a href='/' target='_blank' rel='noreferrer'>
                            <Instagram/>
                        </a>
                        <a href='/' target='_blank' rel='noreferrer'>
                            <Twitter/>
                        </a>
                    </div>
                    <p>© Copyright {new Date().getFullYear()} <b>Savana Treasures</b>. All Rights Reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
