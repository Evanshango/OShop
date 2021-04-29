import React, {useState} from 'react'
import {Dialog, DialogActions, DialogContent} from "@material-ui/core"
import {Input} from "../input/Input"
import {useDispatch, useSelector} from "react-redux"
import {clearRequestError, requestLink} from "../../api"
import styles from "./OrgDialog.module.css"

function LinkDialog() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState('')
    const {loading, message, errors} = useSelector(state => state.activate)

    const closeDialog = () => {
        if (errors.length > 0) dispatch(clearRequestError())
        setEmail('')
        setOpen(false)
    }

    const handleChange = e => {
        if (errors.length > 0) dispatch(clearRequestError())
        setEmail(e.currentTarget.value)
    }

    const makeRequest = () => {
        email !== '' && dispatch(requestLink(email))
        if (!loading && errors.length === 0) {
            setTimeout(() => {
                closeDialog()
            }, 3000)
        }
    }

    return (
        <>
            <span className="btn btn-sm btn-success" onClick={() => setOpen(true)}>Request Link</span>
            <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="xs">
                <h5 style={{margin: '1rem'}}>Request Account activation link...</h5>
                <DialogContent>
                    {message !== '' && (
                        <div className={styles.success}>
                            {message}
                        </div>
                    )}
                    <Input name={'email'} label={'Organization Email*'} type={'email'} placeholder={'Email'}
                           value={email} onchange={handleChange}/>
                    {errors.length > 0 && (
                        <div className={styles.errors}>
                            {errors.map(error => <li key={error.message}>{error.message}</li>)}
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <span className={`btn btn-success mr-3 ${styles.request}`} onClick={makeRequest}
                          aria-disabled={loading}>
                        Request
                    </span>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default LinkDialog
