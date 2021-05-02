import React, {useEffect, useState} from 'react'
import {Dialog, DialogActions, DialogContent} from "@material-ui/core"
import {Input} from "../input/Input"
import {addOrganizationUser, clearAddUserOrgError} from "../../api"
import {useDispatch, useSelector} from "react-redux"
import styles from "./OrgDialog.module.css"

const roles = ['VENDOR', 'ADMIN']

function UserDialog() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState({firstName: '', lastName: '', email: '', role: roles[0]})

    const {errors, loading} = useSelector(state => state.organization.users)

    const closeDialog = () => {
        if (errors && errors.length > 0) dispatch(clearAddUserOrgError())
        setOpen(false)
    }

    const handleChange = e => {
        setUser({...user, [e.target.name]: e.currentTarget.value})
    }

    const saveUser = () => {
        dispatch(addOrganizationUser(user))
    }

    useEffect(() => {
        if (!loading && errors && errors.length === 0) {
            closeDialog()
        }
    }, [loading])

    return (
        <>
            <button className="btn btn-success" onClick={() => setOpen(true)}>Add User</button>
            <Dialog open={open} onClose={closeDialog} fullWidth maxWidth={'sm'}>
                <DialogContent>
                    <h5>Add Organization User</h5>
                    <Input name={'firstName'} label={'First Name'} placeholder={'John'} onchange={handleChange}
                           value={user.firstName}/>
                    <Input name={'lastName'} label={'Last Name'} placeholder={'Doe'} onchange={handleChange}
                           value={user.lastName}/>
                    <Input name={'email'} label={'Email'} placeholder={'john@doe.com'} onchange={handleChange}
                           value={user.email} type={'email'}/>
                    <p style={{marginTop: '.5rem'}}>Role</p>
                    <select className="form-control" name={'role'} onChange={handleChange} defaultValue={user.role}>
                        {roles.map((role, index) => (
                            <option value={role} key={index}>{role}</option>
                        ))}
                    </select>

                    {errors && errors.length > 0 && (
                        <div className={styles.errors}>
                            {errors.map(error => <li key={error.message}>{error.message}</li>)}
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <button className='btn btn-sm btn-success mr-3' onClick={saveUser}
                            disabled={loading && errors}>
                        Save User
                    </button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UserDialog
