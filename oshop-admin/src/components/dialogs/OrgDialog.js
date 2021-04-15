import React, {useEffect, useState} from 'react'
import {addOrganization, clearOrgErrors} from "../../api"
import {useDispatch, useSelector} from "react-redux"
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core"
import styles from './OrgDialog.module.css'
import Input from "../input/Input"
import _ from 'lodash'

function OrgDialog({organization}) {
    const dispatch = useDispatch()
    const {errors, loading} = useSelector(state => state.organization)
    const [open, setOpen] = useState(false)
    const [org, setOrg] = useState({name: '', email: '', password: ''})
    const [pass, setPass] = useState(false)

    const clearInputs = () => {
        if (_.isEmpty(organization)) {
            setOrg({name: '', email: '', password: ''})
        }
    }

    const closeDialog = () => {
        setPass(false)
        clearInputs()
        if (errors.length > 0) dispatch(clearOrgErrors())
        setOpen(false)
    }

    const handleChange = e => setOrg({
        ...org, [e.target.name]: e.currentTarget.value
    })

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(addOrganization(org))
    }

    const openDialog = () => {
        setOpen(true)
        if (!_.isEmpty(organization)) {
            setOrg({name: organization.name, email: organization.email})
        }
    }

    useEffect(() => {
        if (!loading && errors.length === 0) {
            closeDialog()
        }
    }, [loading])


    return (
        <>
            {!_.isEmpty(organization) ? (
                <td><span className={styles.edit_btn} onClick={() => openDialog()}>Edit</span></td>
            ) : (
                <button onClick={() => setOpen(true)}>Add New</button>
            )}
            <Dialog open={open} fullWidth maxWidth="xs" onClose={closeDialog}>
                <DialogTitle><span>Add Organization</span></DialogTitle>
                <DialogContent>
                    <div>
                        <Input name={'name'} label={'Organization Name*'} type={'text'} onchange={handleChange}
                               value={org.name} placeholder={'Name'}/>
                        <Input name={'email'} label={'Organization Email*'} type={'email'} onchange={handleChange}
                               value={org.email} placeholder={'Email'}/>
                        {pass && (
                            <>
                                <Input name={'currPass'} label={'Current Password*'} type={'password'}
                                       onchange={handleChange} value={org.password} placeholder={'Current Password'}/>
                                <Input name={'newPass'} label={'New Password*'} type={'password'}
                                       onchange={handleChange} value={org.password} placeholder={'New Password'}/>
                                <Input name={'confirmPass'} label={'Confirm Password*'} type={'password'}
                                       onchange={handleChange} value={org.password} placeholder={'Confirm Password'}/>
                            </>
                        )}
                        {!_.isEmpty(organization) ? (
                            <button onClick={() => setPass(!pass)} className={styles.show_pass}>
                                {pass ? 'Cancel Password Update' : 'Update Password'}
                            </button>
                        ) : (
                            <Input name={'password'} label={'Organization Password*'} type={'password'}
                                   onchange={handleChange} value={org.password} placeholder={'Password'}/>
                        )}
                    </div>
                    {errors.length > 0 && (
                        <div className={styles.errors}>
                            {errors.map(error => <li key={error.message}>{error.message}</li>)}
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <button className={styles.cancel} onClick={closeDialog}>Cancel</button>
                    <button className={styles.save} onClick={handleSubmit}>
                        {!_.isEmpty(organization) ? 'Update' : 'Save'}
                    </button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default OrgDialog
