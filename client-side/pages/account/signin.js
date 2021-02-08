import {useState} from "react";
import Link from "next/link";
import styles from './Common.module.css'
import {GoogleLogin} from 'react-google-login'
import {useDispatch} from "react-redux";
import {authUser} from "../api";
import {FcGoogle} from "react-icons/fc";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

const Signin = ({clientId}) => {

    const [user, setUser] = useState({email: '', password: ''})
    const dispatch = useDispatch()
    const {doRequest, errors} = useRequest({
        url: 'http://localhost:5000/api/v1/signin',
        method: 'post',
        body: {email: user.email, password: user.password},
        onSuccess: () => {
            (() => Router.push('/'))()
        }
    })

    const googleResponse = async response => {
        const {tokenId} = await response
        dispatch(authUser(tokenId))
    }

    const handleChange = e => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        // dispatch(loginUser(user))
        await doRequest()
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.box_container}>
                <div className={styles.top_container}>
                    <div className={styles.back_drop}/>
                    <div className={styles.header_container}>
                        <h2 className={styles.header_text}>Welcome</h2>
                        <h2 className={styles.header_text}>Back</h2>
                        <h5 className={styles.small_text}>Please Sign in to continue</h5>
                    </div>
                </div>
                <div className={styles.form_area}>
                    <form onSubmit={handleSubmit}>
                        <input className={styles.input_field} type="email" placeholder='Email' name='email'
                               value={user.email} onChange={handleChange}/>
                        <input className={styles.input_field} type="password" placeholder='Password' name='password'
                               value={user.password} onChange={handleChange}/>
                        <div className={styles.account_options}>
                            <Link href={'/account/forgot-password'}>
                                <a className={styles.forgot_password}>Forgot your Password?</a>
                            </Link>
                            <Link href={'/account/signup'}>
                                <a className={styles.create_account}>Create an Account</a>
                            </Link>
                        </div>
                        <br/>
                        <button type='submit' className={styles.btn}>Sign in</button>
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
            </div>
        </div>
    );
}

export const getStaticProps = () => {
    return {
        props: {
            clientId: process.env.GOOGLE_CLIENT_ID
        }
    }
}

export default Signin;