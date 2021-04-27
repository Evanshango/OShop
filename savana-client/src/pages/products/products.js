import React, {useEffect, useState} from 'react'
import styles from './Products.module.css'
import {useDispatch, useSelector} from "react-redux"
import {clearPaymentValues, fetchProducts, searchProducts} from "../../api"
import _ from 'lodash'
import Pagination from "../../components/pagination/Pagination"
import {Link, useLocation} from 'react-router-dom'
import {Breadcrumb} from "react-bootstrap"
import Product from "../../components/product/Product"
import {AiOutlineSearch} from "react-icons/ai"
import {MdHourglassEmpty} from 'react-icons/md'

function Products({match}) {
    let pageNumber = match.params.pageNumber || 1
    const location = useLocation()

    const dispatch = useDispatch()
    const [page, setPage] = useState(pageNumber)
    const [sects, setSects] = useState([])
    const [cats, setCats] = useState([])
    const [selectedCat, setSelectedCat] = useState([])
    const [searchParam, setSearchParam] = useState('')
    const [filterQuery, setFilterQuery] = useState('')

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

    const handleSubmit = e => {
        e.preventDefault()
        if (searchParam !== '') {
            dispatch(searchProducts(searchParam))
        } else {
            dispatch(fetchProducts(page, 12))
        }
    }

    useEffect(() => {
        const {search} = location
        const query = new URLSearchParams(search)
        const filterQ = query.get('search')
        if (filterQ !== null) {
            setFilterQuery(filterQ)
            const filterCategory = categories.length > 0 && categories.find(cat => cat.name === filterQ)
            if (filterCategory) {
                let cat = {}
                cat['category'] = [filterCategory.id]
                dispatch(fetchProducts(page, 12, cat))
            }
        } else {
            setFilterQuery('')
            dispatch(fetchProducts(page, 12))
        }
        window.scrollTo(0, 0)
    }, [location, dispatch, page, categories])

    useEffect(() => {
        if (!_.isEmpty(payment)) {
            dispatch(clearPaymentValues())
        }
    }, [dispatch, payment])

    const handleFilter = () => {
        let cat = {}
        cat['category'] = selectedCat.map(cat => cat.id)
        dispatch(fetchProducts(page, 12, cat))
    }

    useEffect(() => {
        if (selectedCat && selectedCat.length === 0){
            dispatch(fetchProducts(page, 12))
        }
    }, [dispatch, page, selectedCat])


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
                    <div className={styles.tags_area}>
                        {selectedCat.map(filter => (
                            <small key={filter.name} className={styles.filter_tags}>{filter.name}</small>
                        ))}
                    </div>
                )}
            </div>
            {/*Products area*/}
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{to: '/'}} className={styles.b_item}>
                        Home
                    </Breadcrumb.Item>
                    {filterQuery !== '' ? (
                        <>
                            <Breadcrumb.Item linkAs={Link} linkProps={{to: '/products'}}>
                                Products
                            </Breadcrumb.Item>
                            <Breadcrumb.Item active>{filterQuery}</Breadcrumb.Item>
                        </>
                    ): (
                        <Breadcrumb.Item active>Products</Breadcrumb.Item>
                    )}
                </Breadcrumb>
                <div className={styles.search_area}>
                    <form onSubmit={handleSubmit} className={styles.search_form}>
                        <input type="text" placeholder="Products, Categories, Brands" value={searchParam}
                               onChange={e => setSearchParam(e.currentTarget.value)}/>
                        <span className={styles.search_icon}><AiOutlineSearch size={20}/></span>
                    </form>
                    {/*<Search/>*/}
                </div>
                {products && products.length > 0 ? (
                    <>
                        <div className={styles.prod_items}>
                            {products && products.map(product => (
                                <Product product={product} token={token} key={product.id}/>
                            ))}
                        </div>
                        <div className={styles.pagination}>
                            {products.length > 0 && (
                                <Pagination current={page} pages={pages !== null && pages} onClick={setPage}/>
                            )}
                        </div>
                    </>
                ): (
                    <div className={styles.empty_content}>
                        <MdHourglassEmpty size={50} color={'orange'}/>
                        <p style={{fontSize: '1.5rem'}}>Oops, no Products found!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products
