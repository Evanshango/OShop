import Content from "../../../components/Content";
import styles from './Product.module.css'
import Rating from "../../../components/rating/Rating";
import React, {useEffect, useState} from "react";
import {AiOutlineShoppingCart, AiOutlineHeart} from "react-icons/ai";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {addCartItem, deleteCartItem} from "../../api";
import Link from "next/link";

const Product = ({product}) => {
    const dispatch = useDispatch()
    const {products} = useSelector(state => state.cart)
    const {token} = useSelector(state => state.user)
    const [inCart, setInCart] = useState(false)
    const [image, setImage] = useState('')

    useEffect(() => {
        const item = Object.values(products).find(c => c.id === product.id)
        if (item){
            setInCart(true)
        } else {
            setInCart(false)
        }
    }, [Object.values(products)])

    const handleCartClick = () => {
        if (inCart) {
            dispatch(deleteCartItem(product.id))
        } else {
            const {name, images, finalPrice, id} = product
            dispatch(addCartItem({id, name, images, finalPrice}, 1, token))
        }
    }

    const addToWishlist = () => {
        console.log('adding to wishlist')
    }

    return (
        <Content>
            <div className={styles.card_wrapper}>
                <div className={styles.card}>
                    {/*Card left*/}
                    <div className={styles.product_images}>
                        <div className={styles.image_display}>
                            <div className={styles.image_showcase}>
                                <img src={image ? image : product.images[0]} alt={product.name}/>
                            </div>
                        </div>
                        <div className={styles.image_select}>
                            {product.images.map((img, index) => (
                                <div className={styles.image_item} onClick={() => setImage(img)} key={index}>
                                    <a href="#" data-id='1'>
                                        <img src={img} alt={product.name}/>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/*Card right*/}
                    <div className={styles.product_content}>
                        <h2 className={styles.product_title}>{product.name}</h2>
                        <div className={styles.product_rating}>
                            <Rating rating={product.rating}/>
                        </div>
                        {product.discount > 0 && <span className={styles.discount}>{`${product.discount}% off`}</span>}
                        <div className={styles.product_price}>
                            <p className={styles.new_price}>Ksh. {product.finalPrice.toLocaleString()}</p>
                            <p className={styles.old_price}>Ksh. {product.price.toLocaleString()}</p>
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
                                        <button className={!inCart ? `${styles.add_btn}` : `${styles.remove_btn}`}
                                                onClick={handleCartClick}>
                                            <span>{inCart ? 'Remove from' : 'Add to'}</span>
                                            <AiOutlineShoppingCart size={20}/>
                                        </button>
                                    )}
                                </div>
                            </div>
                            {inCart && (
                                <li>
                                    <Link href={'/cart'}>
                                        <a>
                                            <div className={styles.view_cart}>View Cart</div>
                                        </a>
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
            </div>
        </Content>
    )
}

export const getStaticProps = async context => {
    const BASE_URL = process.env.BASE_URL
    const id = context.params.id
    const {data} = await axios.get(`${BASE_URL}/products/${id}`)
    return {
        props: {
            product: data,
        }
    }
}
// , getStaticPaths = async () => {
//     const BASE_URL = process.env.BASE_URL
//     const {data: products} = await axios.get(`${BASE_URL}/products`)
//
//     const paths = products.map(({id}) => ({params: {id: id.toString()}}))
//     return {paths, fallback: false}
// }

export default Product