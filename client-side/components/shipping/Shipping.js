import React, {useState} from 'react';
import styles from "./Shipping.module.css";
import {useDispatch, useSelector} from "react-redux";
import {addAddress, addCheckOutParam} from "../../pages/api";

const addressTypes = [{name: 'Home', value: 'HOME'}, {name: 'Work', value: 'WORK'}]

function Shipping({selected, activateNext, index, checkout}) {
    const dispatch = useDispatch()
    const {addresses, errors} = useSelector(state => state.addresses)
    const [addr, setAddr] = useState(checkout && checkout.address !== '' ? checkout.address : '')
    const [showForm, setShowForm] = useState(false)
    const [address, setAddress] = useState({
        name: '', phone: '', cityTown: '', state: '', postalCode: 1, addressType: ''
    })

    const handleChange = e => setAddress({...address, [e.target.name]: e.currentTarget.value})

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(addAddress(address))

        if (errors.length === 0) {
            setAddress({name: '', phone: '', cityTown: '', state: '', postalCode: 1, addressType: ''})
            setShowForm(false)
        }
    }

    const handleAddressChange = address => setAddr(address.id)

    const handleClick = () => {
        dispatch(addCheckOutParam({...checkout, address: addr}))
        activateNext(selected, index)
    }

    const showFormFields = () => {
        setShowForm(!showForm)
        setAddr('')
        dispatch(addCheckOutParam({...checkout, address: ''}))
    }

    return (
        <div className={selected.active ? `${styles.shipping} ${styles.active}` : `${styles.inactive}`}>
            {addresses.length > 0 ? (
                addresses.map(address => (
                    <div key={address.id} className={styles.address_container}>
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
                <p style={{margin: '1rem 0'}}>You don't have any addresses yet. Click the button below to add</p>
            )}
            <button className={styles.add_new} onClick={showFormFields}>New Address</button>
            {showForm && (
                <div className={styles.add_address}>
                    <div className={styles.form_inputs}>
                       <span>
                           <p>Name*</p>
                            <input className={styles.address_input} name='name' placeholder='Victoria Towers'
                                   onChange={handleChange} value={address.name}/>
                       </span>
                        <span>
                            <p>Phone*</p>
                            <input name='phone' placeholder='254712345678' className={styles.address_input}
                                   onChange={handleChange} value={address.phone}/>
                        </span>
                        <span>
                           <p>City/Town*</p>
                            <input name='cityTown' placeholder='Nairobi' className={styles.address_input}
                                   onChange={handleChange} value={address.cityTown}/>
                       </span>
                        <span>
                            <p>State*</p>
                            <input name='state' placeholder='Kenya' className={styles.address_input}
                                   onChange={handleChange} value={address.state}/>
                        </span>
                        <span>
                           <p>Postal Code*</p>
                            <input type='number' name='postalCode' placeholder='00100' className={styles.address_input}
                                   min={1} onChange={handleChange} value={address.postalCode}/>
                       </span>
                        <span>
                            <p>Address Type*</p>
                            <span className={styles.types}>
                                {addressTypes.map(type => (
                                    <div key={type.name}>
                                        <input type="radio" id='addressType' name='addressType' value={type.value}
                                               onChange={handleChange}/>
                                        <label htmlFor="addressType">{type.name}</label>
                                    </div>
                                ))}
                            </span>
                        </span>
                    </div>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            )}
            <button className={styles.proceed_button} onClick={handleClick}>
                Proceed
            </button>
        </div>
    );
}

export default Shipping;