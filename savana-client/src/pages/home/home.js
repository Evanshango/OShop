import React, {useEffect, useState} from 'react';
import styles from "./Home.module.css";
import Search from "../../components/search/Search";
import Slider from "../../components/slider/Slider";
import {useSelector} from "react-redux";
import _ from 'lodash'
import Featured from "../../components/featured/Featured";
import Latest from "../../components/latest/Latest";
import {Link} from "react-router-dom";

function Home() {
    const {products} = useSelector(state => state.product)
    const {offers} = useSelector(state => state.offer)
    const showImage = (images) => images && images[Math.floor(Math.random() * images.length)]
    const [product, setProduct] = useState({})
    const [bannerProd, setBannerProd] = useState({})

    const handleSubmit = e => {
        e.preventDefault()
    }

    useEffect(() => {
        setProduct(products && products[Math.floor(Math.random() * products.length)])
        const prods = products && products.filter(p => p.discount > 10)
        if (prods) {
            setBannerProd(prods[Math.floor(Math.random() * prods.length)])
        }
    }, [products])

    return (
        <>
            {product && (
                <Slider product={product}>
                    <div className={styles.home_content}>
                        <div className={styles.welcome_info}>
                            <h1>New Arrivals</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cumque dolor dolorem
                                eligendi
                                perspiciatis repellat tempore voluptas? Atque, consectetur, doloribus?
                            </p>
                            <button className={styles.home_button}>View Products</button>
                        </div>
                        <div className={styles.featured_container} style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), 
                                url(${showImage(product.images)})`
                        }}>
                            <h2 className={styles.name}>{product.name}</h2>
                            <h2 className={styles.discount_price}>{`${product.discount}% off`}</h2>
                            <li className={styles.buy_now}>
                                <Link to={`/products/${product.id}`}>
                                    <span style={{color: '#232323'}}>Buy Now</span>
                                </Link>
                            </li>
                        </div>
                    </div>
                </Slider>
            )}
            <div className="main_container">
                <div className={styles.search}>
                    <Search/>
                </div>
                <Featured/>
                <Latest/>
            </div>
            <div className={styles.banner}>
                <div className={styles.banner_content}>
                    {!_.isEmpty(bannerProd) && (
                        <>
                            <div className={styles.banner_left}>
                                <img src={showImage(bannerProd.images)} alt={bannerProd.name}/>
                            </div>
                            <div className={styles.banner_right}>
                                <h2>{bannerProd.category.name}</h2>
                                <h3><span className={styles.discount}>{bannerProd.discount}%</span> sale off</h3>
                                <h2>{bannerProd.name}</h2>
                                <li className={styles.btn}>
                                    <Link to={`/products/${bannerProd.id}`}>
                                        <span>Shop Now</span>
                                    </Link>
                                </li>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="main_container">
                <div className={styles.offers}>
                    <div className={styles.title}>
                        <h5>Offers</h5>
                    </div>
                    <div className={styles.offer_cards}>
                        {offers && offers.map(offer => (
                            <div className={styles.card} key={offer.id} style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), 
                                url(${showImage(offer.product.images)})`
                            }}>
                                <h2>{offer.product.name}</h2>
                                <h1 style={{color: '#fbb419'}}>{`${offer.product.discount}% off`}</h1>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.newsletter}>
                    <div className={styles.contact_left}>
                        <h1>Subscribe to our Newsletter</h1>
                        <p>
                            Leave your email address if you would like to get notifications about our offers
                        </p>
                    </div>
                    <div className={styles.contact_right}>
                        <form onSubmit={handleSubmit}>
                            <input type="email" placeholder='Enter email address'/>
                            <button type='button'>Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;