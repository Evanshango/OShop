import React from 'react'
import Product from "../product/Product"
import styles from './Featured.module.css'
import AliceCarousel from "react-alice-carousel"
import 'react-alice-carousel/lib/alice-carousel.css'

function Featured({products, token}) {
    const responsive = {
        0: {items: 1},
        568: {items: 3},
        990: {items: 4},
    }
    let items = []
    products.forEach(prod => items.push(<Product product={prod} token={token}/>))

    return (
        <div className={styles.featured_container}>
            <div className={styles.title}>
                <h5>Featured</h5>
                <p>View some of the featured products</p>
            </div>
            <div style={{overflow: 'hidden'}}>
                {items.length > 0 && (
                    <AliceCarousel items={items}
                                   autoPlay={items.length > 4}
                                   mouseTracking
                                   infinite={items.length > 4}
                                   touchTracking
                                   autoPlayInterval={5000}
                                   animationDuration={500}
                                   animationType='slide'
                                   autoPlayControls={false}
                                   disableDotsControls={items.length > 4}
                                   disableButtonsControls
                                   responsive={responsive}/>
                )}
            </div>
        </div>
    )
}

export default Featured
