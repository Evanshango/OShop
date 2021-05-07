import React, {useState} from 'react';
import styles from './Auth.module.css'
import {Link, useLocation, useHistory} from "react-router-dom";
import {clearAuthErrors, loginUser} from "../../api";
import {useDispatch, useSelector} from "react-redux";

function Signin() {
    const dispatch = useDispatch()
    const {state} = useLocation()
    const history = useHistory()
    const [user, setUser] = useState({email: '', password: ''})
    const {errors, message} = useSelector(state => state.auth)
    const {products} = useSelector(state => state.cart)

    const handleChange = e => {
        if (errors.length > 0) dispatch(clearAuthErrors())
        setUser({...user, [e.target.name]: e.target.value})
    }

    const signinUser = async e => {
        e.preventDefault()
        dispatch(loginUser(user, products, history, state.from))
    }

    return (
        <div className='container d-flex'>
            <div className={styles.signin_form}>
                <h4 style={{textAlign: 'center'}}>Signin into your Savana Treasures Account</h4>
                <p style={{padding: '1rem 0 0 0', textAlign: 'center'}}>
                    Fill in your account details to proceed with Signing in, otherwise if you do not have an
                    account, you can create an account.
                </p>
                <form onSubmit={signinUser}>
                    <input className={styles.input_field} type="email" placeholder="Email" name="email"
                           value={user.email} onChange={handleChange}/>
                    <input className={styles.input_field} type="password" placeholder="Password" name="password"
                           value={user.password} onChange={handleChange}/>
                    <div className={styles.forgot_password}>
                        <Link to={'/account/forgot-password'}>
                            <span>Forgot your Password?</span>
                        </Link>
                    </div>
                    <button type="submit" className={styles.signin_button}>Sign in</button>
                </form>
                {errors.length > 0 && (
                    <div className={styles.errors}>
                        {errors.map((error, index) => error.message.includes('activation') ? (
                            <div key={index} style={{textAlign: 'center'}}>
                                <li key={error.message}>{error.message} | OR</li>
                                <Link to={'/account/activate/true'}>
                                    <button onClick={() => dispatch(clearAuthErrors())}>Request link</button>
                                </Link>
                            </div>
                        ) : (
                            <li key={index}>{error.message}</li>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Signin;