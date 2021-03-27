import React, {useEffect, useState} from 'react';
import styles from "./Shipping.module.css";
import stylesOverall from './../../pages/checkout/Checkout.module.css'
import {useDispatch, useSelector} from "react-redux";
import {addCheckOutParam} from "../../api";
import AddressDialog from "../address/AddressDialog";

function Shipping({activateNext, index, checkout}) {
    const dispatch = useDispatch()
    const {addresses} = useSelector(state => state.address)
    const [addr, setAddr] = useState('')
    const [expanded, setExpanded] = useState(false)
    const [button, setButton] = useState(true)

    useEffect(() => {
        addr ? setExpanded(false) : setExpanded(true)
    }, [addr])

    const handleAddressChange = address => {
        setAddr(address.id)
        dispatch(addCheckOutParam({...checkout, address: address.id}))
    }

    const nextStep = () => {
        setButton(false)
        activateNext(index)
    }

    const showSelectedAddress = selectedAddress => (
        <div className={styles.selected_address}>
            <div>
                <p>{selectedAddress.name}</p>
                <small>{selectedAddress.phone}</small>
                <p>{selectedAddress.cityTown}, {selectedAddress.state} - {selectedAddress.postalCode}</p>
            </div>
            <small className={styles.address_type}>{selectedAddress.addressType}</small>
        </div>
    )

    const changeAddress = () => {
        if (!expanded) setExpanded(true)
    }

    return (
        <div className={styles.shipping}>
            <div className={stylesOverall.header}>
                {addr ? (
                    <span className={stylesOverall.step_number}>&#10004;</span>
                ) : (
                    <span className={stylesOverall.step_number}>{index + 1}</span>
                )}
                <div className={stylesOverall.header_area}>
                    <h4>Delivery Address</h4>
                    <span className={stylesOverall.btn_change} onClick={() => changeAddress()}>Change</span>
                </div>
            </div>
            <hr/>
            {addresses.length > 0 ? (
                addresses.map(address => (
                    <div key={address.id} className={expanded ?
                        `${styles.address_container} ${stylesOverall.expanded}` : `${stylesOverall.un_expanded}`}>
                        <input type="radio" id='address' name='address' onChange={() => handleAddressChange(address)}
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
                <div className={styles.add_address_area}>
                    <p style={{margin: '1rem 0'}}>You don't have any addresses yet. Click to add</p>
                    <AddressDialog/>
                </div>
            )}
            <div className={stylesOverall.content}>
                {addr ? (
                    <>
                        {showSelectedAddress(addresses.find(address => address.id === addr))}
                        {button && (
                            <button className={stylesOverall.btn_next} onClick={() => nextStep()}>Next</button>
                        )}
                    </>
                ) : (
                    <p>No Address Selected</p>
                )}
            </div>
        </div>
    );
}

export default Shipping;