import React, {useEffect, useState} from 'react'
import styles from './Products.module.css'
import Search from "../../components/search/Search"
import {useDispatch, useSelector} from "react-redux"
import {clearPaymentValues, fetchProducts, searchProducts} from "../../api"
import _ from 'lodash'
import Pagination from "../../components/pagination/Pagination"
import {useHistory} from 'react-router-dom'
import Product from '../../components/product/Product'

function Products({match}) {
    let pageNumber = match.params.pageNumber || 1
    const {location} = useHistory()

    const dispatch = useDispatch()
    const [page, setPage] = useState(pageNumber)
    const [sects, setSects] = useState([])
    const [cats, setCats] = useState([])
    const [selectedCat, setSelectedCat] = useState([])

    const {sections} = useSelector(state => state.section)
    const {categories} = useSelector(state => state.category)
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
        const res = selectedCat.filter(cat => cat.section.name !== deleted[0])
        setSelectedCat(res)
    }

    const fetchCats = sections => {
        let cats = []
        if (categories.length > 0) {
            sections.forEach(sec => cats.push(...categories.filter(cat => cat.section.name === sec)))
            setCats(cats)
        }
    }

    const handleCategoryChange = category => {
        const currIndex = selectedCat.indexOf(category)
        const checkedCats = [...selectedCat]

        currIndex < 0 ? checkedCats.push(category) : checkedCats.splice(currIndex, 1)
        setSelectedCat(checkedCats)
    }

    useEffect(() => {
        const query = new URLSearchParams(location.search)
        const searchQuery = query.get('search')
        if (searchQuery) {
            dispatch(searchProducts(searchQuery))
        } else {
            dispatch(fetchProducts(page, 12))
        }
        window.scrollTo(0, 0)
    }, [location, dispatch, page])

    useEffect(() => {
        if (!_.isEmpty(payment)) {
            dispatch(clearPaymentValues())
        }
    }, [dispatch, payment])

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
                                <small className={styles.count}>{section.categoryCount}</small>
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
                                <small>({category.productCount})</small>
                            </label>
                        </li>
                    ))}
                </ul>
                {selectedCat.length > 0 && (
                    <p>getting filter for (
                        <>
                            {selectedCat.map(filter => (
                                <small key={filter.name}
                                       style={{marginRight: '.5rem', color: 'red'}}>{filter.name},</small>
                            ))}
                        </>)
                    </p>
                )}
            </div>
            {/*Products area*/}
            <div>
                <div className={styles.items}>
                    {products && products.map(product => (
                        <div className={styles.child} key={product.id}>
                            <Product product={product} token={token}/>
                        </div>
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
