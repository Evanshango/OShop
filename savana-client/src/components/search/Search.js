import styles from "./Search.module.css";
import {AiOutlineSearch} from "react-icons/ai";
import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'

function Search() {
    const history = useHistory()
    const [search, setSearch] = useState('')
    const [searchParams, setSearchParams] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        history.push(`/products?${searchParams}`)
    }

    const handleChange = e => {
        setSearch(e.currentTarget.value)
    }

    useEffect(() => {
        const params = new URLSearchParams()
        if (search !== '') {
            params.append("search", search)
        }
        setSearchParams(params.toString())

    }, [search, history])

    return (
        <form onSubmit={handleSubmit} className={styles.search_form}>
            <input type="text" placeholder='Products, Categories, Brands' value={search}
                   onChange={handleChange}/>
            <span className={styles.search_icon}><AiOutlineSearch size={20}/></span>
        </form>
    );
}

export default Search;