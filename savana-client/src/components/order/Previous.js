import React from 'react'
import styles from './Previous.module.css'

function Previous({latest}) {
    return (
        <div style={{marginBottom: '1rem', maxHeight: '30vh', overflowY: 'scroll'}}>
            <div className={styles.orders_header}>
                <h6>Image</h6>
                <h6>Name</h6>
                <h6>Quantity</h6>
                <h6 style={{textAlign: 'end'}}>Price</h6>
            </div>
            {latest.map((item, index) => (
                <div key={index} className={styles.order_item}>
                    <img src={item.product.images[0]} alt={item.product.name} className={styles.order_img}/>
                    <h6>{item.product.name}</h6>
                    <h6>x{item.units}</h6>
                    <h6 style={{textAlign: 'end'}}>{item.totalPrice.toFixed(2)}</h6>
                </div>
            ))}
        </div>
    )
}

export default Previous
