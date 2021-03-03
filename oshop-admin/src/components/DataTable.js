import React from 'react';
import styles from "./items/sections/Section.module.css";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import {useDispatch} from "react-redux";
import {deleteCategory, deleteSection} from "../api";
import SectionCategoryDialog from "./items/sections/SectionCategoryDialog";

function DataTable({data, headers}) {

    const dispatch = useDispatch()

    const handleDelete = item => {
        if (item.section) {
            dispatch(deleteCategory(item.id))
        } else {
            dispatch(deleteSection(item.id))
        }
    }
    return (
        <div>
            <table cellSpacing={0} cellPadding={0} className={styles.items_table}>
                <thead>
                <tr>
                    <th>#</th>
                    {headers.map(header => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.length > 0 && data.map((dt, index) => (
                    <tr key={dt.id}>
                        <td>{index + 1}</td>
                        <td>{dt.name}</td>
                        {dt.section && <td>{dt.section.name}</td>}
                        <td className={styles.action_buttons}>
                            <SectionCategoryDialog dt={{...dt, edit: 'edit'}}/>
                            <span onClick={() => handleDelete(dt)}>
                                <DeleteForeverOutlinedIcon/><h5>Delete</h5>
                            </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={styles.pagination}>
                Pagination...
            </div>
        </div>
    );
}

export default DataTable;