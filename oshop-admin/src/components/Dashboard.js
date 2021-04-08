import React from 'react';
import styles from './Dashboard.module.css'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {useSelector} from "react-redux";

function Dashboard() {

    const {sections} = useSelector(state => state.section)
    const {products} = useSelector(state => state.product)
    const {orders} = useSelector(state => state.order)

    const completePayments = orders && orders.filter(prod => prod.paymentStatus === 'COMPLETED')

    const formatDate = date => {
        const dt = new Date(date)
        return dt.toLocaleString()
    }

    const loadMore = () => {
        console.log('loading more')
    }

    const cards = [
        {
            name: 'Sections',
            value: sections.length,
            color: '#757575'
        },
        {
            name: 'Products',
            value: products.length,
            color: '#4caf50'
        },
        {
            name: 'Orders',
            value: orders.length,
            color: '#29b6f6'
        },
        {
            name: 'Out of Stock',
            value: products && products.filter(prod => prod.stock === 0).length,
            color: '#f44336'
        },
        {
            name: 'Revenue',
            value: completePayments.reduce((acc, curr) => acc + curr.amount, 0),
            color: '#ffa726'
        }
    ]

    return (
        <div className={styles.dashboard_container}>
            <h2>Dashboard</h2>
            <div className={styles.dashboard_top}>
                {cards.map(card => (
                    <div className={styles.dashboard_card} key={card.name} style={{background: `${card.color}`}}>
                        <div className={styles.card_body}>
                            <h2>{card.name}</h2>
                            {card.name === 'Revenue' ? (
                                <h3><span>Kshs.</span> {card.value.toLocaleString()}</h3>
                            ) : (
                                <h3>{card.value.toLocaleString()}</h3>
                            )}
                        </div>
                        <div className={styles.card_footer}>
                            <span>View Details</span>
                            <span className={styles.next_button}><NavigateNextIcon/></span>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.content}>
                <div className={styles.recent_orders}>
                    <div className={styles.recent_orders_top}>
                        <h3>Recent Orders</h3>
                        <button className={styles.view_all_button} onClick={() => loadMore()}>View All</button>
                    </div>
                    <div style={{overflowX: 'auto'}}>
                        <table width='100%' cellPadding={0} cellSpacing={0} className={styles.orders_table}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Order ID</th>
                                <th>Method</th>
                                <th>Order Date</th>
                                <th>Delivery Date</th>
                                <th>Payment Status</th>
                                <th>Total (USD)</th>
                                <th>Order Status</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders && orders.map((order, index) => (
                                <tr key={order.id}>
                                    <td>{index + 1}</td>
                                    <td>{order.id}</td>
                                    <td>
                                        <small className={order.paymentMethod === 'PAYPAL' ? `${styles.paypal}`
                                            : `${styles.mpesa}`}>{order.paymentMethod}
                                        </small>
                                    </td>
                                    <td><small>{formatDate(order.createdAt)}</small></td>
                                    <td>*TODO*</td>
                                    <td className={order.paymentStatus === 'COMPLETED' ? `${styles.pay_complete}`
                                        : `${styles.pay_pending}`}>
                                        <small>{order.paymentStatus}</small>
                                    </td>
                                    <td style={{fontWeight: 'bold', textAlign: 'center'}}>
                                        {`$${order.amount.toLocaleString()}`}
                                    </td>
                                    <td>{order.orderStatus}</td>
                                    <td>Edit/ Delete</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;