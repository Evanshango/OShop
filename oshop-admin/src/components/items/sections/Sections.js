import React from 'react';
import styles from './Section.module.css'
import {useSelector} from "react-redux";
import DataTable from "../../DataTable";
import SectionCategoryDialog from "./SectionCategoryDialog";

function Sections() {
    const {sections} = useSelector(state => state.sections)
    const {categories} = useSelector(state => state.categories)

    return (
        <div className={styles.section_container}>
            <div className={styles.sections}>
                <div className={styles.header_area}>
                    <h3>Sections</h3>
                   <SectionCategoryDialog title={'Section'}/>
                </div>
                <hr/>
                <DataTable data={sections} headers={['Name', 'Actions']}/>
            </div>
            <div className={styles.categories}>
                <div className={styles.header_area}>
                    <h3>Categories</h3>
                    <SectionCategoryDialog title={'Category'}/>
                </div>
                <hr/>
                <DataTable data={categories} headers={['Name', 'Section', 'Actions']}/>
            </div>
        </div>
    );
}

export default Sections;