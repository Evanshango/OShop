import {products} from "../../../mocks/product-list";
import Content from "../../../components/Content";
import styles from './Product.module.css'
import Rating from "../../../components/rating/Rating";
import {useState} from "react";
import {AiOutlineShoppingCart} from "react-icons/ai";

const Product = ({product}) => {
    const [image, setImage] = useState(product.image)
    const [qty, setQty] = useState(1)

    const handleClick = (e, image) => {
        e.preventDefault()
        setImage(image)
    }

    return (
        <Content>
            <div className={styles.card_wrapper}>
                <div className={styles.card}>
                    {/*Card left*/}
                    <div className={styles.product_images}>
                        <div className={styles.image_display}>
                            <div className={styles.image_showcase}>
                                <img src={image} alt={product.name}/>
                            </div>
                        </div>
                        <div className={styles.image_select}>
                            <div className={styles.image_item} onClick={e => handleClick(e, '/img_1.jpg')}>
                                <a href="#" data-id='1'>
                                    <img src={'/img_1.jpg'} alt={product.name}/>
                                </a>
                            </div>
                            <div className={styles.image_item} onClick={e => handleClick(e, '/img_2.jpg')}>
                                <a href="#" data-id='2'>
                                    <img src={'/img_2.jpg'} alt={product.name}/>
                                </a>
                            </div>
                            <div className={styles.image_item} onClick={e => handleClick(e, '/img_4.jpg')}>
                                <a href="#" data-id='3'>
                                    <img src={'/img_4.jpg'} alt={product.name}/>
                                </a>
                            </div>
                            <div className={styles.image_item} onClick={e => handleClick(e, '/img_6.jpg')}>
                                <a href="#" data-id='4'>
                                    <img src={'/img_6.jpg'} alt={product.name}/>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/*Card right*/}
                    <div className={styles.product_content}>
                        <h2 className={styles.product_title}>{product.name}</h2>
                        <div className={styles.product_rating}>
                            <Rating rating={product.ratings}/>
                        </div>
                        <div className={styles.product_price}>
                            <p className={styles.new_price}>Ksh. {product.price.toLocaleString()}</p>
                            <p className={styles.old_price}>Ksh. {product.oldPrice.toLocaleString()}</p>
                        </div>
                        <div className={styles.product_detail}>
                            <ul>
                                <li>Color: <span>Black</span></li>
                                <li>Availability: <span>in stock</span></li>
                                <li>Category: <span>Shoes</span></li>
                            </ul>
                            <div className={styles.purchase_info}>
                                Quantity:
                                <span>
                                    <select name="quantity" id="quantity" onChange={e => setQty(e.currentTarget.value)}
                                            value={qty}>
                                        {[...Array(10)].map((_, index) => (
                                            <option value={index + 1} key={index}>{index + 1}</option>
                                        ))}
                                    </select>
                                </span>
                                <button type='button' className={styles.btn}>
                                    <span> Add to Cart<AiOutlineShoppingCart size={20}/></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.product_desc}>
                    <h2>Product description</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam asperiores
                        excepturi facilis nisi, quae repellat sed similique! Corporis, ipsum! Lorem ipsum dolor
                        sit amet, consectetur adipisicing elit. Aliquam aperiam asperiores
                        excepturi facilis nisi, quae repellat sed similique! Corporis, ipsum!
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aperiam asperiores
                        excepturi facilis nisi, quae repellat sed similique! Corporis, ipsum! Lorem ipsum dolor
                        sit amet, consectetur adipisicing elit. Aliquam aperiam asperiores
                        excepturi facilis nisi, quae repellat sed similique! Corporis, ipsum!
                    </p>
                </div>
                <hr className={styles.divider}/>
                <p className={styles.similar}>Similar Products</p>
            </div>
        </Content>
    )
}

export const getStaticProps = async context => {
    const id = context.params.id
    const product = products.find(p => p.id === +id)
    return {
        props: {product}
    }
}, getStaticPaths = async () => {
    const ids = products.map(prod => prod.id.toString())
    const paths = ids.map(id => ({params: {id: id.toString()}}))
    return {paths, fallback: false}
}

export default Product