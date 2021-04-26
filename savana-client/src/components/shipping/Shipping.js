import React, {useEffect, useState} from 'react'
import styles from "./Shipping.module.css"
import stylesOverall from './../../pages/checkout/Checkout.module.css'
import {useDispatch, useSelector} from "react-redux"
import {addCheckOutParam, cancelLatestOrder} from "../../api"
import AddressDialog from "../address/AddressDialog"
import _ from 'lodash'
import Previous from "../order/Previous"

function Shipping({index, checkout, finishOrder}) {
    const dispatch = useDispatch()
    const {addresses} = useSelector(state => state.address)
    const {token} = useSelector(state => state.auth)
    const {latest} = useSelector(state => state.order)
    const [addr, setAddr] = useState(!_.isEmpty(latest) ? latest.address.id : '')
    const [expanded, setExpanded] = useState(false)
    const [button, setButton] = useState(true)
    const [showChange, setShowChange] = useState(false)

    useEffect(() => {
        addr ? setExpanded(false) : setExpanded(true)
    }, [addr])

    useEffect(() => {
        setAddr(!_.isEmpty(latest) ? latest.address.id : '')
    }, [latest])

    const handleAddressChange = address => {
        setAddr(address.id)
        setShowChange(true)
        dispatch(addCheckOutParam({...checkout, address: address.id}))
    }

    const changeAddress = () => {
        setAddr('')
        dispatch(addCheckOutParam({...checkout, address: ''}))
        if (!expanded) setExpanded(true)
    }

    const clickNext = () => {
        setButton(false)
        setShowChange(false)
        finishOrder(index)
    }

    const cancelOrder = () => {
        dispatch(cancelLatestOrder(latest.id))
    }

    const showSelectedAddress = selectedAddress => (
        <div className={styles.selected_address}>
            <div className={styles.selected}>
                <div>
                    <p style={{fontWeight: 'bold'}}>{selectedAddress.name}</p>
                    <small>{selectedAddress.phone}</small>
                    <p>{selectedAddress.cityTown}, {selectedAddress.state} - {selectedAddress.postalCode}</p>
                </div>
                <small className={styles.address_type}>{selectedAddress.addressType}</small>
            </div>
            {addr !== '' && showChange && (
                <span className={stylesOverall.btn_change} onClick={() => changeAddress()}>Change</span>
            )}
        </div>
    )

    return (
        <div className={styles.shipping}>
            <div className={stylesOverall.header}>
                <div className={stylesOverall.header_area}>
                    <h5>Delivery Address</h5>
                    <AddressDialog/>
                </div>
            </div>
            <hr/>
            <div style={{maxHeight: '50vh', overflowY: 'auto'}}>
                {addresses.length > 0 ? (
                    addresses.map(address => (
                        <div key={address.id} className={expanded ?
                            `${styles.address_container} ${stylesOverall.expanded}` : `${stylesOverall.un_expanded}`}>
                            <input type="radio" id="address" name="address" onChange={() => handleAddressChange(address)}
                                   value={addr} checked={addr === address.id}/>
                            <div className={styles.address_info}>
                                <div>
                                    <p className={styles.full_name}>{address.user.fullName}</p>
                                    <p className={styles.address_type}>{address.addressType}</p>
                                    <p className={styles.address_phone}>{address.phone}</p>
                                </div>
                                <p>{address.name}</p>
                                <p>{address.cityTown} {address.state} - {address.postalCode}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    token && (
                        <div className={styles.add_address_area}>
                            <p style={{margin: '1rem 0'}}>You don't have any addresses yet. Click to add</p>
                        </div>
                    )
                )}
            </div>
            <div className={stylesOverall.content}>
                {addr ? (
                    <>
                        {showSelectedAddress(addresses.find(address => address.id === addr))}
                        <hr/>
                        {!_.isEmpty(latest) && (
                            <div style={{marginTop: '1rem'}}>
                                <p>You have an incomplete order
                                    <span style={{color: 'red', fontWeight: 'bold'}}> #{latest.id}</span>.
                                </p>
                                <Previous latest={latest.items}/>
                                <p>
                                    Click this button below to cancel the order, otherwise click the 'Next' button below
                                    to proceed
                                </p>
                                <button className={styles.cancel_button} onClick={cancelOrder}>Cancel Order</button>
                            </div>
                        )}
                        {button && addr !== '' && (
                            _.isEmpty(latest) && (
                                <div style={{padding: '2rem', textAlign: 'center'}}>
                                    <h4 style={{color: 'red'}}>
                                        Click on the button below if this is your preferred delivery address
                                    </h4>
                                    <button className={stylesOverall.btn_next} onClick={clickNext}>Next</button>
                                </div>
                            )
                        )}
                    </>
                ) : (
                    <p>No Address Selected</p>
                )}
            </div>
        </div>
    )
}

export default Shipping
