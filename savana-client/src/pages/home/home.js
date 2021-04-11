import React, {useEffect, useState} from 'react'
import styles from "./Home.module.css"
import Search from "../../components/search/Search"
import {useDispatch, useSelector} from "react-redux"
import _ from 'lodash'
import {Link} from "react-router-dom"
import {fetchProducts} from "../../api"
import Product from "../../components/product/Product"
import Banner from "../../components/banner/Banner"

function Home() {
    const dispatch = useDispatch()
    const {token} = useSelector(state => state.auth)
    const {products} = useSelector(state => state.product)
    const {offers} = useSelector(state => state.offer)
    const showImage = (images) => images && images[Math.floor(Math.random() * images.length)]
    const [bannerProd, setBannerProd] = useState({})

    const getRandomElements = (prods, limit) => prods.sort(() => Math.random() - Math.random()).slice(0, limit)

    const displayItems = getRandomElements(products && products, 10)

    const handleSubmit = e => {
        e.preventDefault()
    }

    useEffect(() => {
        dispatch(fetchProducts(1, 12))
    }, [dispatch])


    useEffect(() => {
        const prods = products && products.filter(p => p.discount > 10)
        if (prods) {
            setBannerProd(prods[Math.floor(Math.random() * prods.length)])
        }
    }, [products])

    return (
        <>
            <Banner/>
            <div className={styles.search}>
                <Search/>
            </div>
            {/*Featured*/}
            <>
                <div className={styles.title}>
                    <h5>Featured Products</h5>
                </div>
                <div className={styles.home_module}>
                    {products && getRandomElements(products.filter(p => p.featured), 5).map(product => (
                        <Product product={product} key={product.id} token={token}/>
                    ))}
                </div>
            </>
            {/*Featured*/}
            {/*<Latest/>*/}
            <>
                <div className={styles.title} style={{marginTop: '0'}}>
                    <h5>Latest Products</h5>
                </div>
                <div className={styles.row_one}>
                    <div className={styles.home_module}>
                        {displayItems.splice(0, 5).map(product => (
                            <Product product={product} key={product.id} token={token}/>
                        ))}
                    </div>
                </div>
                <div className={styles.row_two}>
                    <div className={styles.home_module}>
                        {displayItems.splice(0, 5).map(product => (
                            <Product product={product} key={product.id} token={token}/>
                        ))}
                    </div>
                </div>
                <div className={styles.show_more}>
                    {products && products.length > 10 && (
                        <li className={styles.btn_show_more}>
                            <Link to={'/products'}>
                                <button>Show More</button>
                            </Link>
                        </li>
                    )}
                </div>
            </>
            {/*<Latest/>*/}
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
                            offer.product && (
                                <Link to={`/products/${offer.product.id}`} className={styles.card} key={offer.id}
                                      style={{
                                          backgroundImage: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), 
                                        url(${showImage(offer.product.images)})`
                                      }}>
                                    <h2 style={{textTransform: 'capitalize'}}>{offer.product.name}</h2>
                                    <h1 style={{color: '#fbb419'}}>{`${offer.product.discount}% off`}</h1>
                                </Link>
                            )
                        ))}
                    </div>
                </div>
                <div className={styles.newsletter}>
                    <div className={styles.contact_left}>
                        <h1>Subscribe to our Newsletter</h1>
                        <p style={{marginBottom: '1rem'}}>
                            Leave your email address if you would like to get notifications about our offers
                        </p>
                    </div>
                    <div className={styles.contact_right}>
                        <form onSubmit={handleSubmit}>
                            <input type="email" placeholder="Enter email address"/>
                            <button type="button">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
