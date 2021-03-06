import React from 'react';
import styles from './Section.module.css'
import {useSelector} from "react-redux";
import DataTable from "../../DataTable";
import SectionCategoryDialog from "./SectionCategoryDialog";

function Sections() {
    const {sections} = useSelector(state => state.section)
    const {categories} = useSelector(state => state.category)

    return (
        <div className={styles.section_container}>
            <div className={styles.sections}>
                <div className={styles.header_area}>
                    <h3>Sections</h3>
                   <SectionCategoryDialog title={'Section'}/>
                </div>
                <hr/>
                <div style={{overflowX: 'auto'}}>
                    <DataTable data={sections} headers={['Name', 'Actions']}/>
                </div>
            </div>
            <div className={styles.categories}>
                <div className={styles.header_area}>
                    <h3>Categories</h3>
                    <SectionCategoryDialog title={'Category'}/>
                </div>
                <hr/>
                <div style={{overflowX: 'auto'}}>
                    <DataTable data={categories} headers={['Image','Name', 'Section', 'Actions']} tag={'categories'}/>
                </div>
            </div>
        </div>
    );
}

export default Sections;
