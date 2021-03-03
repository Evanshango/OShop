import React from 'react';
import styles from './Dashboard.module.css'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {useSelector} from "react-redux";

const orders = [
    {
        id: 1,
        method: 'Cash',
        date: '20 Jan, 2021',
        status: 'Processing',
        total: 5000
    },
    {
        id: 2,
        method: 'Visa',
        date: '22 Jan, 2021',
        status: 'Processing',
        total: 2000
    },
    {
        id: 3,
        method: 'Visa',
        date: '22 Jan, 2021',
        status: 'Confirmed',
        total: 2400
    },
    {
        id: 4,
        method: 'Cash',
        date: '21 Jan, 2021',
        status: 'Confirmed',
        total: 7000
    }
]

const customers = [
    {
        id: 1,
        photo: 'https://picsum.photos/200/300',
        name: 'John Doe',
        email: 'john@doe.com'
    },
    {
        id: 2,
        photo: 'https://picsum.photos/200/300',
        name: 'Jane Doe',
        email: 'jane@doe.com'
    },
    {
        id: 3,
        photo: 'https://picsum.photos/200/300',
        name: 'Cisco Ramon',
        email: 'cisco@ramon.com'
    },
    {
        id: 4,
        photo: 'https://picsum.photos/200/300',
        name: 'Barry Allen',
        email: 'allen@barry.com'
    }
]

function Dashboard() {

    const {sections} = useSelector(state => state.sections)

    const cards = [
        {
            name: 'Sections',
            value: sections.length,
            color: '#757575'
        },
        {
            name: 'Products',
            value: 10,
            color: '#4caf50'
        },
        {
            name: 'Orders',
            value: 6,
            color: '#29b6f6'
        },
        {
            name: 'Out of Stock',
            value: 3,
            color: '#f44336'
        },
        {
            name: 'Revenue',
            value: 20000,
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
                    <h3>Recent Orders</h3>
                    <table width='100%' cellPadding={0} cellSpacing={0} className={styles.orders_table}>
                        <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Method</th>
                            <th>Order Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.method}</td>
                                <td>{order.date}</td>
                                <td className={styles.order_status}>{order.status}</td>
                                <td>{order.total}</td>
                                <td>Edit/ Delete</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.users}>
                    <div className={styles.top_area}>
                        <h3>Customers</h3>
                        <button>See all</button>
                    </div>
                    <hr/>
                    {customers.map(customer => (
                        <div className={styles.user_data} key={customer.id}>
                            <div className={styles.user_info}>
                                <img src={customer.photo} alt={customer.name}/>
                                <span>
                                <p style={{fontWeight: 'bold'}}>{customer.name}</p>
                                <h6>{customer.email}</h6>
                            </span>
                            </div>
                            <div className={styles.actions}>
                                <button className={styles.email}>Email</button>
                                <button className={styles.call}>Call</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;