import React from 'react'
import styles from './Categories.Module.css'
import {useHistory} from 'react-router-dom'

function Categories({categories}) {

    const history = useHistory()

    const handleClick = name => {
        history.push({
            pathname: '/products',
            search: `?search=${name}`,
            state: {category: name}
        })
    }

    return (
        <div className={styles.categories_container}>
            <div className={styles.title}>
                <h5>Categories</h5>
                <p>View our categories collection</p>
            </div>
            <div className={styles.cat_holder}>
                {categories.map(cat => (
                    <div className={styles.card_item} key={cat.id} onClick={() => handleClick(cat.name)}>
                        <h3>{cat.name}</h3>
                        <p>Show related products &#8594;</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories
