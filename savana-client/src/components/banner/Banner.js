import React, {useEffect, useState} from 'react'
import styles from './Banner.module.css'
import {Image} from "react-bootstrap"
import {Carousel} from "react-bootstrap"
import {Link} from "react-router-dom"

function Banner() {

    const img1 = `${window.location.origin}/images/savana_1.jpg`
    const img2 = `${window.location.origin}/images/savana_2.jpg`
    const img3 = `${window.location.origin}/images/savana_3.jpg`

    const [images, setImages] = useState([img2, img1, img3])

    useEffect(() => {
        setImages([img2, img1, img3])
    }, [img1, img2, img3])

    return (
        <Carousel fade>
            {images.map((image, index) => (
                <Carousel.Item interval={2000} key={index} className={styles.container}>
                    <Image src={image} alt="" className="d-block w-100" height="700"/>
                    <Carousel.Caption className={styles.caption}>
                        <h1>We are your here to avail quality products for you</h1>
                        <h3>From imagination to reality, browse our latest products available now!</h3>
                        <li className={styles.buy_now}>
                            <Link to={'/products'}>
                                <button>Shop Now</button>
                            </Link>
                        </li>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default Banner
