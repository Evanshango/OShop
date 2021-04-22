import React, {useEffect, useState} from 'react'
import styles from "./Home.module.css"
import {useDispatch, useSelector} from "react-redux"
import _ from 'lodash'
import {Link} from "react-router-dom"
import {fetchProducts} from "../../api"
import Banner from "../../components/banner/Banner"
import Featured from "../../components/featured/Featured"
import Categories from "../../components/categories/Categories"

function Home() {
    const dispatch = useDispatch()
    const {token} = useSelector(state => state.auth)
    const {products} = useSelector(state => state.product)
    const {offers} = useSelector(state => state.offer)
    const {categories} = useSelector(state => state.category)
    const showImage = (images) => images && images[Math.floor(Math.random() * images.length)]
    const [bannerProd, setBannerProd] = useState({})

    const getRandomElements = (prods, limit) => prods.sort(() => Math.random() - Math.random()).slice(0, limit)

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
            {/*Featured*/}
            {/*<Featured products={products && getRandomElements(products.filter(p => p.featured), 4)} token={token}/>*/}
            <Featured products={products && products.filter(p => p.featured)} token={token}/>
            {/*Featured*/}
            {/*Categories*/}
            <Categories categories={categories && getRandomElements(categories, 6)}/>
            {/*Categories*/}
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
                                    <h2 style={{textTransform: 'capitalize', color: 'white'}}>{offer.product.name}</h2>
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
