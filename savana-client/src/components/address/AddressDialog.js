import React, {useState} from 'react'
import {Dialog, DialogActions, DialogContent} from "@material-ui/core"
import {useDispatch, useSelector} from "react-redux"
import styles from './Address.module.css'
import {addAddress, clearAddressError} from "../../api"
import Input from "../input/Input"

const addressTypes = [{name: 'Home', value: 'HOME'}, {name: 'Work', value: 'WORK'}]

function AddressDialog() {
    const dispatch = useDispatch()
    const {errors} = useSelector(state => state.address)
    const [open, setOpen] = useState(false)
    const [address, setAddress] = useState({
        name: '', phone: '', cityTown: '', state: '', postalCode: 1, addressType: addressTypes[0].value
    })

    const openDialog = () => setOpen(true)

    const closeDialog = () => {
        if (errors.length > 0) dispatch(clearAddressError())
        setAddress({name: '', phone: '', cityTown: '', state: '', postalCode: 1, addressType: addressTypes[0].value})
        setOpen(false)
    }

    const handleChange = e => {
        setAddress({
            ...address, [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async () => {
        const id = await dispatch(addAddress(address))
        if (id) {
            setTimeout(() => {
                closeDialog()
            }, 1000)
        } else {
            setOpen(true)
        }
    }

    return (
        <>
            <button onClick={() => openDialog()} className={styles.btn_open}>New Address</button>
            <Dialog open={open} fullWidth maxWidth="sm" onClose={closeDialog}>
                <h2 style={{padding: '1rem 0 0 1.3rem'}}>Add Address</h2>
                <DialogContent>
                    <div className={styles.address_content}>
                        <Input name="name" type="text" placeholder="Unknown Street, Anonymous" label="Name*"
                               value={address.name}
                               onchange={handleChange}/>
                        <Input name="phone" type="text" placeholder="254712345678" label="Phone*" value={address.phone}
                               onchange={handleChange}/>
                        <div className={styles.grid_area}>
                            <Input name="cityTown" type="text" placeholder="Nairobi" label="City/Town*"
                                   value={address.cityTown} onchange={handleChange}/>
                            <Input name="state" type="text" placeholder="Kenya" label="State*" value={address.state}
                                   onchange={handleChange}/>
                        </div>
                        <div className={styles.grid_area}>
                            <Input name="postalCode" type="number" placeholder="8900" label="Postal Code*"
                                   value={address.postalCode} onchange={handleChange}/>
                            <span>
                                <p style={{padding: '.8rem 0'}}>Address Type</p>
                                <select name="addressType" onChange={handleChange}>
                                    {addressTypes.map(address => (
                                        <option value={address.value} key={address.name}>{address.name}</option>
                                    ))}
                                </select>
                            </span>
                        </div>
                        {errors.length > 0 && (
                            <div className={styles.errors}>
                                {errors.map(error => <li key={error.message}>{error.message}</li>)}
                            </div>
                        )}
                    </div>
                </DialogContent>
                <DialogActions>
                    <button className={styles.save_button} onClick={handleSubmit}>Save</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddressDialog
