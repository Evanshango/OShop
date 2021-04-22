import React, {useState} from 'react'
import styles from "../../pages/account/Account.module.css"
import {authUser, clearAuthErrors, loginUser, registerUser} from "../../api"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {GoogleLogin} from "react-google-login"
import {FcGoogle} from "react-icons/fc"
import {FiCheckCircle} from 'react-icons/fi'

function Auth({clientId}) {
    const {errors, message} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [user, setUser] = useState({email: '', password: ''})
    const [newUser, setNewUser] = useState({firstName: '', lastName: '', email: '', password: ''})
    const [error, setError] = useState([])
    const {products} = useSelector(state => state.cart)

    const handleChange = e => {
        if (errors.length > 0) dispatch(clearAuthErrors())
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSignupChange = e => {
        if (errors.length > 0) dispatch(clearAuthErrors())
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }

    const signinUser = async e => {
        e.preventDefault()
        dispatch(loginUser(user, products))
    }

    const signupUser = async e => {
        e.preventDefault()
        dispatch(registerUser(newUser))
    }

    const googleResponse = async response => {
        const {tokenId, type} = await response

        let err = []
        if (type === 'error') err.push('Check your connection and reload the page')
        if (tokenId) {
            dispatch(authUser(tokenId, products))
        }
        setError(err)
    }

    return (
        <>
            {message === '' ? (
                <>
                    <div className={styles.profile_container}>
                        <div className={styles.grid_item}>
                            <h2>Signin into your Savana Treasures Account</h2>
                            <p style={{padding: '0 1rem'}}>
                                Fill in your account details to proceed with Signing in, otherwise if you do not have an
                                account, you can create an account.
                            </p>
                            <form onSubmit={signinUser} style={{marginTop: '3rem'}}>
                                <input className={styles.input_field} type="email" placeholder="Email" name="email"
                                       value={user.email} onChange={handleChange}/>
                                <input className={styles.input_field} type="password" placeholder="Password" name="password"
                                       value={user.password} onChange={handleChange}/>
                                <div className={styles.forgot_password}>
                                    <Link to={'/account/forgot-password'}>
                                        <span>Forgot your Password?</span>
                                    </Link>
                                </div>
                                <button type="submit">Sign in</button>
                            </form>
                        </div>
                        <div className={styles.grid_item}>
                            <h2>Create your Savana Treasures Account</h2>
                            <p>
                                Create your Savana Treasures Account in just a few clicks! You can also register using your
                                google
                                email address.
                            </p>
                            <form onSubmit={signupUser}>
                                <input className={styles.input_field} type="text" placeholder="First Name" name="firstName"
                                       value={newUser.firstName} onChange={handleSignupChange}/>
                                <input className={styles.input_field} type="text" placeholder="Last Name" name="lastName"
                                       value={newUser.lastName} onChange={handleSignupChange}/>
                                <input className={styles.input_field} type="email" placeholder="Email" name="email"
                                       value={newUser.email} onChange={handleSignupChange}/>
                                <input className={styles.input_field} type="password" placeholder="Password" name="password"
                                       value={newUser.password} onChange={handleSignupChange}/>
                                <button type="submit" style={{marginTop: '1rem'}}>Sign up</button>
                            </form>
                        </div>
                    </div>
                    {errors.length > 0 && (
                        <div className={styles.errors}>
                            {errors.map((error, index) => error.message.includes('activation') ? (
                                <div key={index} style={{textAlign: 'center'}}>
                                    <li key={error.message}>{error.message} | OR</li>
                                    <Link to={'/account/activate/true'}>
                                        <button>Request link</button>
                                    </Link>
                                </div>
                            ) : (
                                <li key={index}>{error.message}</li>
                            ))}
                        </div>
                    )}
                    <div className={styles.google_area}>
                        <div className={styles.options}>
                            <hr className={styles.divider}/>
                            <p style={{padding: 10}}>Or</p>
                            <hr className={styles.divider}/>
                        </div>
                        {error.length === 0 ? (
                            <GoogleLogin clientId={clientId} onSuccess={googleResponse} onFailure={googleResponse}
                                         cookiePolicy={'single_host_origin'} render={props => (
                                <button className={styles.google_button} onClick={props.onClick}>
                            <span style={{display: 'flex', alignItems: 'center', whiteSpace: 'nowrap'}}>
                                <FcGoogle size={28} style={{background: '#fff'}}/>
                                Continue with Google
                            </span>
                                </button>)}>
                            </GoogleLogin>
                        ) : (
                            <div className={styles.errors}>
                                {error.map(err => <li key={err}>{err}</li>)}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className={styles.success}>
                    <FiCheckCircle size={60} color={'green'}/>
                    <p style={{padding: '1rem', fontSize: '1.3rem', color: 'green'}}>{message}</p>
                </div>
            )}
        </>
    )
}

export default Auth
