import React from 'react';
import styles from "./Shipping.module.css";

function Shipping({selected, activateNext, index}) {
    return (
        <div className={selected.active ? `${styles.shipping} ${styles.active}` : `${styles.inactive}`}>
            Shipping here
            <button onClick={() => activateNext(selected, index)}>Proceed</button>
        </div>
    );
}

export default Shipping;