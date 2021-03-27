import React from 'react';
import styles from './Featured.module.css'
import {useSelector} from "react-redux";
import Product from "../product/Product";

function Featured() {
    const {products} = useSelector(state => state.product)

    const getRandomElements = (prods, limit) => prods.sort(() => Math.random() - Math.random()).slice(0, limit)

    return (
        <>
            <div className={styles.title}>
                <h5>Featured Products</h5>
            </div>
            <div className={styles.product_center}>
                {products && getRandomElements(products.filter(p => p.featured), 5).map(product => (
                    <Product product={product} key={product.id}/>
                ))}
            </div>
        </>
    )
}

export default Featured;