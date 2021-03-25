import styles from './Featured.module.css'
import Content from "../Content";
import Product from "../product/Product";
import {useSelector} from "react-redux";

const Featured = () => {
    const {products} = useSelector(state => state.product)

    const getRandomElements = (prods, limit) => prods.sort(() => Math.random() - Math.random()).slice(0, limit)

    return (
        <Content>
            <div className={styles.title}>
                <h5>Featured Products</h5>
            </div>
            <div className={styles.product_center}>
                {products && getRandomElements(products.filter(p => p.featured), 5).map(product => (
                    <Product product={product} key={product.id}/>
                ))}
            </div>
        </Content>
    )
}

export default Featured