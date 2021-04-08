import {useSelector} from "react-redux";
import styles from './Orders.module.css'
import Pagination from "../pagination/Pagination";
import React, {useState} from "react";

function Orders() {
    const {orders} = useSelector(state => state.order)
    const [page, setPage] = useState(1)

    const formatDate = date => {
        const dt = new Date(date)
        return dt.toLocaleString()
    }

    console.log(page)

    return (
        <div className={styles.content}>
            <table cellSpacing={0} cellPadding={0} className={styles.orders_table}>
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>Payment Method</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders && orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td><small>{formatDate(order.createdAt)}</small></td>
                        <td>{order.paymentMethod}</td>
                        <td>
                            <button className={styles.view_button}>View</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={styles.pagination}>
                {orders && (
                    <Pagination current={page} last={orders.length} range={1} onClick={setPage}/>
                )}
            </div>
        </div>
    );
}

export default Orders;