import styles from './Latest.module.css'
import React from "react";
import Content from "../Content";
import {useSelector} from "react-redux";
import Product from "../product/Product";

const Latest = () => {
    const {products} = useSelector(state => state.product)

    const getRandomElements = (prods, limit) => prods.sort(() => Math.random() - Math.random()).slice(0, limit)

    return (
        <Content>
            <div className={styles.title}>
                <h5>Latest Products</h5>
            </div>
            <div className={styles.latest_center}>
                {products && getRandomElements(products, 10).map(product => (
                    <Product product={product} key={product.id}/>
                ))}
            </div>
            <div className={styles.show_more}>
                {products && products.length > 10 && (
                    <button>Show More</button>
                )}
            </div>
        </Content>
    )
}

export default Latest