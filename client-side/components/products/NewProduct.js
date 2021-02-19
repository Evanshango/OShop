import styles from './NewProducts.module.css'
import Link from "next/link";
import React from "react";

const elements = [...Array(10)]

const NewProduct = ({name}) => {
    return (
        <div className={styles.product_container}>
            <h5>{name}</h5>
            <div className={styles.product_card_container}>
                {elements.length > 4 ? elements.slice(0, 4).map((el, index) => (
                    <div className={styles.product_card} key={index}>
                        <Link href={'/'}>
                            <a>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci architecto,
                                    dicta
                                    ex facere neque non quam quo sit temporibus.
                                </p>
                            </a>
                        </Link>
                    </div>
                )): (
                    elements.map((el, index) => (
                        <div className={styles.product_card} key={index}>
                            <Link href={'/'}>
                                <a>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci architecto,
                                        dicta
                                        ex facere neque non quam quo sit temporibus.
                                    </p>
                                </a>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default NewProduct