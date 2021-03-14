import React from 'react';
import styles from './Payment.module.css'

function Payment({selected, activateNext, index}) {
    return (
        <div className={selected.active ? `${styles.payment} ${styles.active}` : `${styles.inactive}`}>
            Payment here
            <button onClick={() => activateNext(selected, index)}>Proceed</button>
        </div>
    );
}

export default Payment;