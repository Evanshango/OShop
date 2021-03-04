import React from 'react';
import styles from "./items/sections/Section.module.css";
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import {useDispatch} from "react-redux";
import {deleteCategory, deleteProduct, deleteSection} from "../api";
import SectionCategoryDialog from "./items/sections/SectionCategoryDialog";
import ProductDialog from "./items/products/ProductDialog";

function DataTable({data, headers, tag}) {

    const dispatch = useDispatch()

    const handleDelete = (item, string) => {
        if (string === 'product') dispatch(deleteProduct(item.id))

        if (item.section && !string) dispatch(deleteCategory(item.id))

        if (!item.section && !string) dispatch(deleteSection(item.id))
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
                        {tag === 'products' && (
                            <>
                                <td>
                                    <img src={dt.images[0]} alt={data.name} className={styles.data_image}/>
                                </td>
                                <td>{dt.category !== null ? dt.category.name : 'Undefined'}</td>
                                <td>{dt.price.toFixed(2)}</td>
                                <td>{dt.stock > 0 ? 'Available' : 'Unavailable'}</td>
                                <td>{dt.discount}</td>
                                <td>{dt.discountPrice.toFixed(2)}</td>
                                <td>{dt.finalPrice.toFixed(2)}</td>
                                <td>{dt.stock}</td>
                                <td>{dt.createdBy.email}</td>
                                <td className={styles.action_buttons}>
                                   <div className={styles.prod_actions}>
                                       <ProductDialog data={dt}/>
                                       <span onClick={() => handleDelete(dt, 'product')}>
                                            <DeleteForeverOutlinedIcon/><h5>Delete</h5>
                                        </span>
                                   </div>
                                </td>
                            </>
                        )}
                        {tag !== 'products' && (
                            <>
                                {dt.section && <td>{dt.section.name}</td>}
                                <td className={styles.action_buttons}>
                                    <SectionCategoryDialog dt={{...dt, edit: 'edit'}}/>
                                    <span onClick={() => handleDelete(dt)}>
                                        <DeleteForeverOutlinedIcon/><h5>Delete</h5>
                                </span>
                                </td>
                            </>
                        )}
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