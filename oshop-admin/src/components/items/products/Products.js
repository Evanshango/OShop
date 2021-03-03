import React from 'react';
import styles from "./Products.module.css";
import ProductDialog from "./ProductDialog";
import DataTable from "../../DataTable";
import {useSelector} from "react-redux";

function Products() {
    const {products} = useSelector(state => state.products)
    return (
        <div className={styles.products_container}>
            <h3>Products</h3>
            <ProductDialog/>
            <div className={styles.search_products}>
                Search Products
            </div>
            <div className={styles.products_table}>
                <DataTable data={products} headers={['Name', 'Image', 'Category', 'Price', 'Status', 'Discount', 'Stock', 'Actions']}/>
            </div>
        </div>
    );
}

export default Products;