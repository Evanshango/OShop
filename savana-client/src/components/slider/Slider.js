import React, {useEffect, useState} from 'react';
import styles from "./Slider.module.css";
import _ from "lodash";

function Slider({children, product}) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [images, setImages] = useState([])

    useEffect(() => {
        if (!_.isEmpty(product)) {
            setImages(product.images)
        }
    }, [product])

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1)
        }, 5000)
        return () => clearInterval(interval)
    }, [activeIndex, images.length])

    return (
        <div className={styles.slider_wrapper}>
            <div className={styles.slider_images} style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url(${images[activeIndex]})`
            }}>
                <div className={styles.slider_content}>
                    {children}
                </div>
            </div>
            <div className={styles.slider_dots}>
                {images.map((image, index) => (
                    <span key={index} onClick={() => setActiveIndex(index)}
                          className={activeIndex === index ? `${styles.dot} ${styles.active_dot}` : styles.dot}/>
                ))}
            </div>
        </div>
    )
}

export default Slider;