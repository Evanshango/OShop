import styles from "../product/Product.module.css";
import Link from "next/link";
import {MdAddShoppingCart} from 'react-icons/md'
import {AiOutlineEye, AiOutlineHeart} from "react-icons/ai";
import Rating from "../rating/Rating";
import {useDispatch} from "react-redux";
import {addCartItem} from "../../pages/api";

const Product = ({product, token}) => {
    const dispatch = useDispatch()

    const truncate = (word, n) => word?.length > n ? `${word.substr(0, n - 1)}...` : word

    const addToCart = (prod, e) => {
        e.preventDefault()
        const {name, images, finalPrice, id} = prod
        const item = {id, name, images, finalPrice}
        dispatch(addCartItem(item, 1, token))
    }

    const showImage = (images) => <img src={images[Math.floor(Math.random() * images.length)]} alt=""/>

    return (
        <div className={styles.product}>
            <div className={styles.product_header}>
                <div className={styles.offer}>{`${product.discount} % off`}</div>
                {product.images && showImage(product.images)}
                <ul className={styles.icons}>
                    <Link href={'/products/[id]'} as={`/products/${product.id}`}>
                        <h3><AiOutlineEye/></h3>
                    </Link>
                    {product.stock > 0 && <h3 onClick={event => addToCart(product, event)}><MdAddShoppingCart/></h3>}
                    <h3><AiOutlineHeart onClick={() => console.log('Adding to Wishlist')}/></h3>
                </ul>
                <div className={product.stock > 0 ? `${styles.in_stock}` : `${styles.out_stock}`}>
                    {product.stock > 0 ? 'in stock' : 'out of stock'}
                </div>
            </div>
            <div className={styles.product_footer}>
                <Link href={'/products/[id]'} as={`/products/${product.id}`}>
                    <a>
                        <h5>{truncate(product.name, 20)}</h5>
                        <div className={styles.ratings}>
                            <Rating rating={product.rating}/>
                        </div>
                        <h5 className={styles.price}>
                            <span>Ksh. {product.price.toLocaleString()}</span> |
                            Ksh. {product.finalPrice.toLocaleString()}
                        </h5>
                    </a>
                </Link>
            </div>
        </div>
    );
}

export default Product;