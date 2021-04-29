import React, {useState} from 'react';
import styles from "./Products.module.css";
import ProductDialog from "./ProductDialog";
import DataTable from "../../DataTable";
import {useSelector} from "react-redux";

function Products() {
    const {products} = useSelector(state => state.product)
    const [defaultItems, setDefaultItems] = useState(10)
    const [search, setSearch] = useState('')

    const loadProducts = () => {
        console.log(defaultItems)
    }

    const handleSearch = e => {
        e.preventDefault()
    }

    return (
        <div className={styles.products_container}>
            <h3>Products</h3>
            <div className={styles.top_area}>
                <ProductDialog/>
            </div>
            <div className={styles.search_products}>
                <div className={styles.items_limit}>
                    <h4>Number of items per page*</h4>
                    <input name='limit' type='number' value={defaultItems} min={1}
                           onChange={e => setDefaultItems(e.currentTarget.value)}/>
                    <button className={styles.load_more} onClick={() => loadProducts()}>Load</button>
                </div>
                <div className={styles.search_term}>
                    <h4>Search Product by Name*</h4>
                    <form onSubmit={handleSearch}>
                        <input name='search' type='text' value={search} placeholder='eg. Beads'
                               onChange={e => setSearch(e.currentTarget.value)}/>
                        <button className={styles.search_button} type='submit'>Search</button>
                    </form>
                </div>
            </div>
            <div className={styles.products_table}>
                <DataTable data={products} tag={'products'} headers={['Name', 'Image', 'Category', 'Price', 'Status',
                    'Discount(%)', 'Discount Price($)', 'Final Price($)', 'Featured', 'Stock', 'Owner', 'Actions']}/>
            </div>
        </div>
    );
}

export default Products;
