import React, {useState} from 'react';
import styles from "../../pages/account/Profile.module.css";
import Link from "next/link";
import {GoogleLogin} from "react-google-login";
import {FcGoogle} from "react-icons/fc";
import {authUser, clearAuthErrors, loginUser} from "../../pages/api";
import {useDispatch, useSelector} from "react-redux";

function Auth({clientId}) {
    const {errors: authErrors} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [user, setUser] = useState({email: '', password: ''})

    const handleChange = e => {
        if (authErrors.length > 0) dispatch(clearAuthErrors())
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(loginUser(user))
    }

    const googleResponse = async response => {
        const {tokenId} = await response
        dispatch(authUser(tokenId))
    }

    return (
        <div className={styles.profile_container}>
            <div className={styles.grid_item}>
                <h2>Signin</h2>
                <form onSubmit={handleSubmit}>
                    <input className={styles.input_field} type="email" placeholder='Email' name='email'
                           value={user.email} onChange={handleChange}/>
                    <input className={styles.input_field} type="password" placeholder='Password' name='password'
                           value={user.password} onChange={handleChange}/>
                    {authErrors.length > 0 && (
                        <div className={styles.errors}>
                            {authErrors.map(error => <li key={error.message}>{error.message}</li>)}
                        </div>
                    )}
                    <div className={styles.forgot_password}>
                        <Link href={'/account/forgot-password'}>
                            <a>Forgot your Password?</a>
                        </Link>
                    </div>
                    <button type='submit'>Sign in</button>
                </form>
                <div className={styles.options}>
                    <hr className={styles.divider}/>
                    <p style={{padding: 10}}>Or</p>
                    <hr className={styles.divider}/>
                </div>
                <GoogleLogin clientId={clientId} onSuccess={googleResponse} onFailure={googleResponse}
                             cookiePolicy={'single_host_origin'} render={props => (
                    <button className={styles.google_button} onClick={props.onClick}>
                        <FcGoogle size={28} style={{background: '#fff'}}/>
                        <span>Sign in with Google</span>
                    </button>
                )}>
                </GoogleLogin>
            </div>
            <div className={styles.grid_item}>
                <h2>Create your Oshop Account</h2>
                <p>
                    Create your OShop Account in just a few clicks! You can also register using your google email
                    address.
                </p>
            </div>
        </div>
    );
}

export default Auth;