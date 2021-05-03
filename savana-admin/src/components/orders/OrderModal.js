import React, {useState} from 'react'
import overall from "../Dashboard.module.css"
import {Dialog} from "@material-ui/core"
import {useDispatch, useSelector} from "react-redux"
import {fetchOrder} from "../../api"
import styles from './OrderModal.module.css'
import _ from 'lodash'
import {Badge, Form, Table} from "react-bootstrap"
import {DisabledField} from "../input/Input"
import dayjs from "dayjs"

function OrderModal({orderId}) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const {order} = useSelector(state => state.order)
    const [selectedDate, setSelectedDate] = useState(dayjs(new Date().toISOString()).format('YYYY-MM-DD'))

    const openDialog = () => {
        setOpen(true)
        dispatch(fetchOrder(orderId))
    }

    const closeDialog = () => {
        setOpen(false)
    }

    const handleDateChange = (e) => setSelectedDate(e.currentTarget.value)

    const handleChange = e => e.preventDefault()

    const handleUpdate = () => {
        console.log(selectedDate)
    }

    return (
        <>
            <button className={`btn btn-sm btn-outline-primary ${overall.view_button}`} onClick={() => openDialog()}>
                View
            </button>
            <Dialog open={open} onClose={closeDialog} fullWidth maxWidth={'md'}>
                <p style={{padding: '1rem 1rem 0 1rem'}}>
                    <b>OrderID </b><span style={{textTransform: 'uppercase'}}>{orderId}</span>
                </p>
                <div style={{padding: '0 1rem'}}>
                    {!_.isEmpty(order) ? (
                        <>
                            <div style={{marginBottom: '1rem'}}>
                                <h5>Actions</h5>
                                <p>Set Delivery Date</p>
                                <div className={styles.date}>
                                    <input type="date" value={selectedDate} onChange={e => handleDateChange(e)}/>
                                    <button className="btn btn-sm btn-outline-primary" onClick={handleUpdate}>
                                        Update
                                    </button>
                                </div>
                            </div>
                            <div className={styles.order_items}>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <h5 style={{margin: 0}}>Delivery Address</h5>
                                    <Badge variant={order.paymentMethod === 'PAYPAL' ? 'primary' : 'success'}>
                                        {order.paymentMethod}
                                    </Badge>
                                </div>
                                <Form style={{marginTop: '1rem'}} className={styles.address_info}>
                                    <DisabledField value={order.address.phone} onchange={handleChange} label={'Phone'}/>
                                    <DisabledField value={order.address.addressType} onchange={handleChange}
                                                   label={'Address Type'}/>
                                    <DisabledField value={order.address.cityTown} onchange={handleChange}
                                                   label={'City/Town'}/>
                                    <DisabledField value={order.address.state} onchange={handleChange} label={'State'}/>
                                    <DisabledField value={order.address.postalCode} onchange={handleChange}
                                                   label={'Postal Code'}/>
                                    <DisabledField value={order.address.name} onchange={handleChange} label={'Street'}/>
                                </Form>
                            </div>
                            <div className={styles.items}>
                                <h5>Order Items</h5>
                                <div className={styles.single_items}>
                                    <Table responsive striped bordered hover>
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Units</th>
                                            <th>Price(USD)</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {order.items.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <img src={item.product.images[0]} alt={item.product.name}
                                                         className={styles.prod_image}/>
                                                </td>
                                                <td>{item.product.name}</td>
                                                <td>{item.product.category.name}</td>
                                                <td>x{item.units}</td>
                                                <td>{item.price.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                    <div className={styles.total_amount}>
                                        <p>${order.amount.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div>
                            <p>Order not found</p>
                        </div>
                    )}
                </div>
            </Dialog>
        </>
    )
}

export default OrderModal
