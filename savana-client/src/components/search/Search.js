import styles from "./Search.module.css";
import {AiOutlineSearch} from "react-icons/ai";
import React from "react";

function Search() {
    const handleSubmit = e => {
        e.preventDefault()
    }
    return (
        <form onSubmit={handleSubmit} className={styles.search_form}>
            <input type="text" placeholder='Products, Categories, Brands'/>
            <span className={styles.search_icon}><AiOutlineSearch size={20}/></span>
        </form>
    );
}

export default Search;