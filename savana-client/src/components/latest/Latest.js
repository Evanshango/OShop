import styles from './Latest.module.css'
import React from "react";
import {useSelector} from "react-redux";
import Product from "../product/Product";

const Latest = () => {
    const {products} = useSelector(state => state.product)

    const getRandomElements = (prods, limit) => prods.sort(() => Math.random() - Math.random()).slice(0, limit)

    return (
        <div className={styles.latest_container}>
            <div className={styles.title}>
                <h5>Latest Products</h5>
            </div>
            <div className={styles.content_area}>
                {products && getRandomElements(products, 10).map(product => (
                    <li key={product.id}>
                        <Product product={product} key={product.id}/>
                    </li>
                ))}
            </div>
            <div className={styles.show_more}>
                {products && products.length > 10 && (
                    <button>Show More</button>
                )}
            </div>
        </div>
    )
}

export default Latest