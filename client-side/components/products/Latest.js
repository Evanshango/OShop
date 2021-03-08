import Link from "next/link";
import styles from './Latest.module.css'
import React from "react";
import {products} from "../../mocks/product-list";
import Product from "../product/Product";
import Content from "../Content";

const Latest = () => {
    return (
        <Content>
            <div className={styles.title}>
                <h5>Latest Products</h5>
            </div>
            <div className={styles.latest_center}>
                {/*{products.slice(0, 8).map(product => (*/}
                {/*    <Product product={product} key={product.id}/>*/}
                {/*))}*/}
            </div>
            {/*{products.length > 6 && (*/}
            {/*    <div className={styles.show_more}>*/}
            {/*        <Link href={'/products'}>*/}
            {/*            <button>Show More &#8594;</button>*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*)}*/}
        </Content>
    )
}

export default Latest