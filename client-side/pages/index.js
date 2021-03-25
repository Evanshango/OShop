import React from "react";
import styles from './../styles/Home.module.css'
import Slider from "../components/slider/Slider";
import Featured from "../components/products/Featured";
import Latest from "../components/products/Latest";
import Content from "../components/Content";
import Link from "next/link";
import Search from "../components/search/Search";
import {useSelector} from "react-redux";

const images = [
    '/img_1.jpg',
    '/img_2.jpg',
    '/img_9.jpg',
    '/img_home.jpg'
]

const Home = () => {

    const {offers} = useSelector(state => state.offer)
    const showImage = (images) => images[Math.floor(Math.random() * images.length)]

    const handleSubmit = e => {
        e.preventDefault()
    }
    return (
        <>
            <Slider images={images}>
                <div className={styles.home_content}>
                    <div className={styles.welcome_info}>
                        <h1>New Arrivals</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cumque dolor dolorem eligendi
                            perspiciatis repellat tempore voluptas? Atque, consectetur, doloribus?
                        </p>
                        <button className={styles.home_button}>View Products</button>
                    </div>
                    <div className={styles.featured_container}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis est excepturi inventore,
                            possimus repellat sapiente velit veritatis voluptate. Dolor, minima.
                        </p>
                    </div>
                </div>
            </Slider>
            <div className={styles.search}>
                <Search/>
            </div>
            <Featured/>
            <Latest/>
            <div className={styles.banner}>
                <div className={styles.banner_content}>
                    <div className={styles.banner_left}>
                        <img src={'/img_1.jpg'} alt="image"/>
                    </div>
                    <div className={styles.banner_right}>
                        <h2>Smartphone</h2>
                        <h3><span className={styles.discount}>70%</span> sale off</h3>
                        <h2>Hurry while stocks last</h2>
                        <Link href={'/products'} passHref>
                            <a className={styles.btn}>
                                <button>Shop Now</button>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <Content>
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
            </Content>
        </>
    )
}

export default Home
