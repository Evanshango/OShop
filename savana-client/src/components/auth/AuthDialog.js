import {Dialog, DialogContent} from "@material-ui/core";
import React, {useState} from "react";
import styles from './Auth.module.css'
import {clearAuthErrors, loginUser} from "../../api";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

function AuthDialog() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState({email: '', password: ''})
    const {errors} = useSelector(state => state.auth)
    const {products} = useSelector(state => state.cart)

    const closeDialog = () => {
        if (errors && errors.length > 0) dispatch(clearAuthErrors())
        setOpen(false)
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(loginUser(user, products))
    }

    const openDialog = () => {
        if (errors && errors.length > 0) dispatch(clearAuthErrors())
        setOpen(true)
    }

    const handleChange = e => {
        if (errors && errors.length > 0) dispatch(clearAuthErrors())
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <div className={styles.auth_container}>
            <div className={styles.button}>
                <button className={styles.auth_button} onClick={() => openDialog()}>Sign in</button>
            </div>
            <Dialog open={open} fullWidth maxWidth='sm'>
                <div className={styles.dialog_header}>
                    <h2>Signin</h2>
                    <span onClick={closeDialog}>&#10006;</span>
                </div>
                <DialogContent>
                    <div className={styles.dialog_content}>
                        <form onSubmit={handleSubmit}>
                            <input className={styles.input_field} type="email" placeholder='Email' name='email'
                                   value={user.email} onChange={handleChange}/>
                            <input className={styles.input_field} type="password" placeholder='Password' name='password'
                                   value={user.password} onChange={handleChange}/>
                            {errors && errors.length > 0 && (
                                <div className={styles.errors}>
                                    {errors.map(error => <li key={error.message}>{error.message}</li>)}
                                </div>
                            )}
                            <div className={styles.forgot_password}>
                                <Link to={'/account/forgot-password'}>
                                    <span>Forgot your Password?</span>
                                </Link>
                            </div>
                            <button type='submit'>Sign in</button>
                        </form>
                        <div className={styles.options}>
                            <hr className={styles.divider}/>
                            <p style={{padding: 10}}>Or</p>
                            <hr className={styles.divider}/>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AuthDialog