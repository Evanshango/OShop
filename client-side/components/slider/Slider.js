import styles from './Slider.module.css'
import {useEffect, useState} from "react";

const Slider = ({children, images}) => {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1)
        }, 5000)
        return () => clearInterval(interval)
    }, [activeIndex])

    return (
        <div className={styles.slider_wrapper}>
            <div className={styles.slider_images}
                 style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url(${images[activeIndex]})`}}>
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

export default Slider