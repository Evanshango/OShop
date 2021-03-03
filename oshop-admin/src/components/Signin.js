import React, {useState} from 'react';
import styles from './Signin.module.css'
import {useDispatch, useSelector} from "react-redux";
import {authUser} from "../api";

function Signin() {
    const [user, setUser] = useState({email: '', password: ''})

    const dispatch = useDispatch()
    const errors = useSelector(state => state.user.errors)

    const handleChange = e => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(authUser(user))
    }

    return (
        <div className={styles.login_screen}>
            <div className={styles.login_form}>
                <h2>Signin</h2>
                <form onSubmit={handleSubmit}>
                    <p>Email*</p>
                    <input type="email" placeholder='Email' name='email' onChange={handleChange}/>
                    <p>Password*</p>
                    <input type="password" placeholder='Password' name='password' onChange={handleChange}/>
                    <button type='submit'>Signin</button>
                    {errors.length > 0 && errors.map(error => (
                        <p key={error.message} className={styles.error_message}>{error.message}</p>
                    ))}
                </form>
            </div>
        </div>
    );
}

export default Signin;