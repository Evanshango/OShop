import React, {useEffect, useState} from 'react';
import styles from './Products.module.css'
import Search from "../../components/search/Search";
import {categories} from "../../mocks/product-list";
import {useDispatch, useSelector} from "react-redux";
import Product from "../../components/product/Product";
import Pagination from "../../components/pagination/Pagination";
import {clearPaymentValues, fetchProducts} from "../../api";
import _ from 'lodash'

function Products({match}) {
    let pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()
    const [page, setPage] = useState(pageNumber)
    const [sects, setSects] = useState([])
    const [cats, setCats] = useState([])
    const [selectedCat, setSelectedCat] = useState([])

    const {sections} = useSelector(state => state.section)
    const {products, pages} = useSelector(state => state.product)
    const {token} = useSelector(state => state.auth)
    const {payment} = useSelector(state => state.paypal)

    const handleSectionChange = (name) => {
        const currIndex = sects.indexOf(name)
        const checkedSects = [...sects]
        currIndex < 0 ? checkedSects.push(name) : removeSecAndCat(checkedSects, currIndex)
        fetchCats(checkedSects)
        setSects(checkedSects)
    }

    const removeSecAndCat = (sections, currIndex) => {
        const deleted = sections.splice(currIndex, 1)
        setSects(sections)
        const res = selectedCat.filter(cat => cat.section !== deleted[0])
        setSelectedCat(res)
    }

    const fetchCats = sections => {
        let cats = []
        sections.forEach(sec => cats.push(...categories.filter(cat => cat.section === sec)))
        setCats(cats)
    }

    const handleCategoryChange = category => {
        const currIndex = selectedCat.indexOf(category)
        const checkedCats = [...selectedCat]

        currIndex < 0 ? checkedCats.push(category) : checkedCats.splice(currIndex, 1)
        setSelectedCat(checkedCats)
    }

    useEffect(() => {
        if (!_.isEmpty(payment)) {
            dispatch(clearPaymentValues())
        }
    }, [dispatch, payment])

    useEffect(() => {
        dispatch(fetchProducts(page, 12))
    }, [dispatch, pageNumber, page])

    const handleFilter = () => {
        console.log(selectedCat)
    }

    return (
        <div className={styles.content}>
            <div className={styles.search_area}>
                <Search/>
            </div>
            {/*Categories area*/}
            <div className={styles.categories}>
                <div className={styles.filter_header}>
                    <h2>Sections</h2>
                </div>
                <ul>
                    {sections.length > 0 && sections.map(section => (
                        <li key={section.id}>
                            <input type="checkbox" name="section" id="section"
                                   onChange={() => handleSectionChange(section.name)}/>
                            <label htmlFor="section">
                                <span>{section.name}</span>
                                <small>({section.categoryCount})</small>
                            </label>
                        </li>
                    ))}
                </ul>
                <hr/>
                <div className={styles.filter_header}>
                    <h2>Categories</h2>
                    <button disabled={selectedCat.length === 0} onClick={handleFilter}>Apply</button>
                </div>
                <ul>
                    {cats.length > 0 && cats.map(category => (
                        <li key={category.id}>
                            <input type="checkbox" name="category" id="category"
                                   onChange={() => handleCategoryChange(category)}/>
                            <label htmlFor="category">
                                <span>{category.name}</span>
                                <small>({category.count})</small>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            {/*Products area*/}
            <div className={styles.products}>
                <div className={styles.product_items}>
                    {products.length > 0 && products.map(product => (
                        <Product product={product} key={product.id} token={token}/>
                    ))}
                </div>
                <div className={styles.pagination}>
                    {products.length > 0 && (
                        <Pagination current={page} pages={pages !== null && pages} onClick={setPage}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Products;