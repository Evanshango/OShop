import React from 'react'
import styles from './Categories.Module.css'

function Categories({categories}) {
    return (
        <div className={styles.categories_container}>
            <div className={styles.title}>
                <h5>Categories</h5>
                <p>View our categories collection</p>
            </div>
            <div className="row mt-3">
                {categories.map(cat => (
                    <div className="col-md-4 col-sm-6" key={cat.id}>
                        <div className={styles.card_item}>
                            <h3>{cat.name}</h3>
                            <p>Show related products &#8594;</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories
