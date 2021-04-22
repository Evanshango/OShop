import React from 'react'
import styles from './Product.module.css'
import Rating from "../rating/Rating"
import {Link} from "react-router-dom"
import {AiOutlineEye, AiOutlineHeart} from "react-icons/ai"
import {MdAddShoppingCart} from "react-icons/md"
import {addCartItem} from "../../api"
import {useDispatch} from "react-redux"

function Product({product, token}) {
    const dispatch = useDispatch()

    const showImage = (images) => <img src={images[Math.floor(Math.random() * images.length)]} alt=""
                                       className={styles.card_image}/>

    const truncate = (word, n) => word?.length > n ? `${word.substr(0, n - 1)}...` : word

    const addToCart = (prod, e) => {
        e.preventDefault()
        const {name, images, finalPrice, id} = prod
        const item = {id, name, images, finalPrice}
        dispatch(addCartItem(item, 1, token))
    }

    return (

        <div className={`${styles.card} col-md-3 col-sm-4 mb-3`}>
            <div className={styles.card_header}>
                {product.discount > 0 && <div className={styles.offer}>{`${product.discount} % off`}</div>}
                {product.images && showImage(product.images)}
                <ul className={styles.icons}>
                    <h3>
                        <Link to={`/products/${product.id}`}>
                            <AiOutlineEye/>
                        </Link>
                    </h3>
                    {product.stock > 0 && <h3 onClick={event => addToCart(product, event)}><MdAddShoppingCart/></h3>}
                    <h3><AiOutlineHeart onClick={() => console.log('Adding to Wishlist')}/></h3>
                </ul>
            </div>
            <div className={styles.card_info}>
                <Link to={`/products/${product.id}`}>
                    <div className={product.stock > 0 ? `${styles.in_stock}` : `${styles.out_stock}`}>
                        {product.stock > 0 ? 'in stock' : 'out of stock'}
                    </div>
                    <h2>{truncate(product.name, 20)}</h2>
                    <div className={styles.ratings}>
                        <Rating rating={product.rating}/>
                    </div>
                    <h5 className={styles.price}>
                        {product.price > product.finalPrice && <span>${product.price.toLocaleString()}</span>}
                        ${product.finalPrice.toLocaleString()}
                    </h5>
                </Link>
            </div>
        </div>
    )
}

export default Product
