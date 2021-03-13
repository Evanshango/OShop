import React, {useEffect, useState} from 'react';
import styles from './Products.module.css'
import {categories} from "../mocks/product-list";
import Product from "../components/product/Product";
import Pagination from "../components/pagination/Pagination";
import {AiOutlineSearch} from "react-icons/ai";
import {useSelector} from "react-redux";

const Products = ({user}) => {
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('')
    const [order, setOrder] = useState('')
    const [sects, setSects] = useState([])
    const [cats, setCats] = useState([])
    const [oldCategories, setOldCategories] = useState([])

    const {sections} = useSelector(state => state.section)
    const {products} = useSelector(state => state.product)
    const {token} = useSelector(state => state.user)

    let sectionCategories = []

    const handleSubmit = e => {
        e.preventDefault()
        console.log('Searching...')
    }

    const handleSectionChange = (name) => {
        const currIndex = sects.indexOf(name)
        const checkedSects = [...sects]
        currIndex < 0 ? checkedSects.push(name) : checkedSects.splice(currIndex, 1)
        setSects(checkedSects)
    }

    const handleCategoryChange = (name) => {
        const currIndex = cats.indexOf(name)
        const checkedCats = [...cats]

        currIndex < 0 ? checkedCats.push(name) : checkedCats.splice(currIndex, 1)
        setCats(checkedCats)
    }

    const handleFilter = () => {
        console.log(cats)
    }

    useEffect(() => {
        let newCats = []
        sects.forEach(sec => newCats.push(...categories.filter(cat => cat.section === sec)))
        sectionCategories.push(...newCats)
        setOldCategories(sectionCategories)

    }, [sects])

    return (
        <div className={styles.content}>
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
                    <button disabled={cats.length === 0} onClick={handleFilter}>Apply</button>
                </div>
                <ul>
                    {oldCategories.length > 0 && oldCategories.map(category => (
                        <li key={category.id}>
                            <input type="checkbox" name="category" id="category"
                                   onChange={() => handleCategoryChange(category.name)}/>
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
                <div className={styles.filter_area}>
                    <div className={styles.search_area}>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder='Products, Categories, Brands'/>
                            <span className={styles.search_icon}>
                                <AiOutlineSearch size={20}/>
                            </span>
                        </form>
                    </div>
                    <div className={styles.options}>
                        <select name="sort" id="sort">
                            <option value="">Sort By</option>
                            <option value="name">Name</option>
                            <option value="price">Price</option>
                        </select>
                        <select name="order" id="order">
                            <option value="">Order</option>
                            <option value="asc">DESC</option>
                            <option value="desc">ASC</option>
                        </select>
                        <button>Apply</button>
                    </div>
                </div>
                <div className={styles.product_items}>
                    {products.length > 0 && products.map(product => (
                        <Product product={product} key={product.id} token={token}/>
                    ))}
                </div>
                <div className={styles.pagination}>
                    <Pagination current={page} last={1000} range={2} onClick={setPage}/>
                </div>
            </div>
        </div>
    );
}

export default Products;