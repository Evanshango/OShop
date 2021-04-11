import React, {useEffect, useState} from 'react'
import styles from './Banner.module.css'
import {Link} from "react-router-dom"
import img1 from '../../assets/images/savana_1.jpg'
import img2 from '../../assets/images/savana_2.jpg'
import img3 from '../../assets/images/savana_3.jpg'

function Banner() {

    const [activeIndex, setActiveIndex] = useState(0)
    const [images, setImages] = useState([img2, img1, img3])

    useEffect(() => {
        setImages([img2, img1, img3])
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1)
        }, 5000)
        return () => clearInterval(interval)
    }, [activeIndex, images.length])

    return (
        <div className={styles.banner_container}>
            <div className={styles.banner_info}>
                <h1>Affordable Products at affordable Prices</h1>
                <h4>Shop now for the best deals on a variety of products</h4>
                <li className={styles.buy_now}>
                    <Link to={'/products'}>
                        <span>Shop Now</span>
                    </Link>
                </li>
            </div>
            <div className={styles.banner} style={images.length > 0 ? {
                    background: `linear-gradient(rgba(0, 0, 0, .1),
                rgba(0, 0, 0, .1)), url(${images[activeIndex]}) center center`
                } :
                {background: 'linear-gradient(rgba(0, 0, 0, .1), rgba(0, 0, 0, .1)'}}>
                <div className={styles.banner_optional}>
                    <h1>Affordable Products at affordable Prices</h1>
                    <h4>Shop now for the best deals on a variety of products</h4>
                    <li className={styles.buy_now}>
                        <Link to={'/products'}>
                            <button>Shop Now</button>
                        </Link>
                    </li>
                </div>
                <div className={styles.slider_dots}>
                    {images.map((image, index) => (
                        <span key={index} onClick={() => setActiveIndex(index)}
                              className={activeIndex === index ? `${styles.dot} ${styles.active_dot}` : styles.dot}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Banner
