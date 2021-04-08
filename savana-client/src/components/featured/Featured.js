import React, {useRef} from 'react';
import styles from './Featured.module.css'
import {useSelector} from "react-redux";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Product from "../product/Product";

function Featured() {
    let itemRef = useRef(null)
    const {products} = useSelector(state => state.product)

    const handleBack = () => {
        itemRef.current.scrollLeft += -400;
    }

    const handleNext = () => {
        // itemRef.current.children[15].scrollIntoView({behavior: 'smooth'})
        itemRef.current.scrollLeft += 400;
    }

    const featured = () => products && products.filter(p => p.featured)

    // const getRandomElements = (prods, limit) => prods.sort(() => Math.random() - Math.random()).slice(0, limit)

    return (
        <div className={styles.featured_container}>
            <div className={styles.title}>
                <h5>Featured Products</h5>
            </div>
            <div className={styles.content}>
                {featured().length > 5 && <ArrowBackIcon className={styles.nav_icons} onClick={() => handleBack()}/>}
                <div className={styles.featured_content}>
                    <ul className={styles.content_area} ref={itemRef}>
                        {featured().map(product => (
                            <li key={product.id}>
                                <Product product={product} key={product.id}/>
                            </li>
                        ))}
                    </ul>
                </div>
                {featured().length > 5 && <ArrowForwardIcon className={styles.nav_icons} onClick={() => handleNext()}/>}
            </div>
        </div>
    )
}

export default Featured;