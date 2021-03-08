import styles from './Featured.module.css'
import Content from "../Content";
import Product from "../product/Product";
import {products} from '../../mocks/product-list'

const Featured = () => {
    return (
        <Content>
            <div className={styles.title}>
                <h5>Featured Products</h5>
            </div>
            <div className={styles.product_center}>
                {/*{products.length > 4 && products.slice(0, 4).map(product => (*/}
                {/*    <Product product={product} key={product.id}/>*/}
                {/*))}*/}
            </div>
        </Content>
    )
}

export default Featured