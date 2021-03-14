import styles from './Billing.module.css'

function Billing({selected, activateNext, index}) {
    return (
        <div className={selected.active ? `${styles.billing} ${styles.active}` : `${styles.inactive}`}>
            <div className={styles.inputs}>
                <span>
                    <p>Full name*</p>
                    <input className={styles.input}/>
                </span>
                <span>
                    <p>Email*</p>
                    <input type='email' className={styles.input}/>
                </span>
            </div>
            <div className={styles.inputs}>
                <span>
                    <p>Address*</p>
                    <input className={styles.input}/>
                </span>
                <span>
                    <p>Phone*</p>
                    <input type='number' className={styles.input}/>
                </span>
            </div>
            <div className={styles.checkbox}>
                <input type="checkbox" name='addAddress' id='addAddress'/>
                <label htmlFor="addAddress">I do not see my address</label>
            </div>
            <hr/>
            <div className={styles.checkbox}>
                <input type="checkbox" name='shippingAddress' id='shippingAddress'/>
                <label htmlFor="shippingAddress">Use a different shipping address</label>
            </div>
            <button onClick={() => activateNext(selected, index)}>Proceed</button>
        </div>
    );
}

export default Billing;