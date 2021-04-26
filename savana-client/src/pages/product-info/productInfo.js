import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {AiOutlineHeart, AiOutlineShoppingCart} from "react-icons/ai"
import {FcEmptyFilter} from "react-icons/fc"
import {addCartItem, deleteCartItem, fetchProduct} from "../../api"

import _ from 'lodash'
import styles from './Product.module.css'
import Rating from "../../components/rating/Rating"
import {Link} from "react-router-dom"
import AliceCarousel from "react-alice-carousel"
import 'react-alice-carousel/lib/alice-carousel.css'
import {Breadcrumb} from "react-bootstrap"
import Product from "../../components/product/Product"

function ProductInfo({match: {params}}) {
    const dispatch = useDispatch()
    const {products} = useSelector(state => state.cart)
    const {product, similar, errors} = useSelector(state => state.item)
    const {token} = useSelector(state => state.auth)
    const [inCart, setInCart] = useState(false)
    const [image, setImage] = useState('')

    const item = product && Object.values(products).find(c => c.id === product.id)

    const responsive = {
        0: {items: 1},
        568: {items: 3},
        1024: {items: 5},
    }

    const items = []
    similar.forEach(prod => items.push(
        <div className={styles.item}>
            <Product product={prod} token={token}/>
        </div>
    ))

    useEffect(() => {
        dispatch(fetchProduct(params.id))
        if (!_.isEmpty(item)) {
            setInCart(true)
        } else {
            setInCart(false)
        }
    }, [params.id, dispatch, products, item])

    const handleCartClick = () => {
        if (inCart) {
            dispatch(deleteCartItem(product.id, token))
        } else {
            const {name, images, finalPrice, id} = product
            dispatch(addCartItem({id, name, images, finalPrice}, 1, token))
        }
    }

    const addToWishlist = () => console.log('adding to wishlist')

    return (
        <div className="main_container">
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}}>Home</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{to: '/products'}}>Products</Breadcrumb.Item>
                <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
            </Breadcrumb>
            {errors && errors.length > 0 ? (
                <div className={styles.empty}>
                    <FcEmptyFilter/>
                    <p>Oops! Something went wrong while fetching product...</p>
                </div>
            ) : (
                !_.isEmpty(product) && (
                    <div className={styles.card_wrapper}>
                        <div className={styles.card}>
                            {/*ProductInfo left*/}
                            <div className={styles.product_images}>
                                <div className={styles.image_display}>
                                    <div className={styles.image_showcase}>
                                        <img src={image ? image : product.images[0]} alt={product.name}/>
                                    </div>
                                </div>
                                <div className={styles.image_select}>
                                    {product.images.map((img, index) => (
                                        <div className={styles.image_item} onClick={() => setImage(img)} key={index}>
                                            <img src={img} alt={product.name}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/*ProductInfo right*/}
                            <div className={styles.product_content}>
                                <h2 className={styles.product_title}>{product.name}</h2>
                                <div className={styles.product_rating}>
                                    <Rating rating={product.rating}/>
                                </div>
                                {product.discount > 0 &&
                                <span className={styles.discount}>{`${product.discount}% off`}</span>}
                                <div className={styles.product_price}>
                                    <p className={styles.new_price}>$ {product.finalPrice.toLocaleString()}</p>
                                    <p className={styles.old_price}>$ {product.price.toLocaleString()}</p>
                                </div>
                                <div className={styles.product_detail}>
                                    <ul>
                                        <li>Availability:
                                            <span className={styles.availability}>
                                        {product.stock > 0 ? 'in stock' : 'out of stock'}
                                    </span>
                                        </li>
                                        <li>Category: <span>{product.category.name}</span></li>
                                    </ul>
                                    <div className={styles.purchase_info}>
                                        <div className={styles.info}>
                                            <button className={styles.wishlist} onClick={addToWishlist}>
                                                <span>Save for later</span><AiOutlineHeart size={20}/>
                                            </button>
                                            {product.stock > 0 && (
                                                <button
                                                    className={!inCart ? `${styles.add_btn}` : `${styles.remove_btn}`}
                                                    onClick={handleCartClick}>
                                                    <span>{inCart ? 'Remove from' : 'Add to'}</span>
                                                    <AiOutlineShoppingCart size={20}/>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {inCart && (
                                        <li>
                                            <Link to={'/cart'}>
                                            <span>
                                                <div className={styles.view_cart}>View Cart</div>
                                            </span>
                                            </Link>
                                        </li>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.product_desc}>
                            <h2>Product description</h2>
                            <p>
                                {product.description}
                            </p>
                        </div>
                        <hr className={styles.divider}/>
                        <p className={styles.similar}>Similar Products</p>
                        <div className={styles.similar_products}>
                            {items.length > 0 ? (
                                <AliceCarousel mouseTracking items={items} autoWidth={true} responsive={responsive}
                                               controlsStrategy="alternate" infinite={items.length > 4}
                                               autoPlay={items.length > 4} disableButtonsControls
                                               autoPlayInterval={5000} touchTracking animationType={'slide'}
                                               animationDuration={500} autoPlayControls={false}
                                               disableDotsControls
                                />
                            ) : (
                                <p style={{color: 'red', textAlign: 'center', fontSize: '1.5rem'}}>
                                    There are currently no similar products..
                                </p>
                            )}
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default ProductInfo
