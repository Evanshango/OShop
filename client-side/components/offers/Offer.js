import styles from './Offer.module.css'

const Offer = () => {
    return (
        <div className={styles.offer_container}>
            <h5>Offers</h5>
            <div className={styles.offer_card_container}>
                <div className={styles.offer_card}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci architecto, dicta
                        ex facere neque non quam quo sit temporibus.
                    </p>
                </div>
                <div className={styles.offer_card}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci architecto, dicta
                        ex facere neque non quam quo sit temporibus.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Offer