import styles from './Signin.module.css'
import stylesOverall from './../../pages/checkout/Checkout.module.css'
import _ from 'lodash'
import googleStyle from './../auth/Auth.module.css'
import AuthDialog from "../auth/AuthDialog";
import {FcGoogle} from "react-icons/fc";
import {GoogleLogin} from "react-google-login";
import React from "react";
import {authUser} from "../../api";
import {useDispatch} from "react-redux";

function Signin({activateNext, index, user, clientId}) {
    const dispatch = useDispatch()

    const googleResponse = async response => {
        const {tokenId} = await response
        dispatch(authUser(tokenId))
    }

    return (
        <div className={styles.billing}>
            <div className={stylesOverall.header}>
                {_.isEmpty(user) ? (
                    <span className={stylesOverall.step_number}>{index + 1}</span>
                ) : (
                    <span className={stylesOverall.step_number}>&#10004;</span>
                )}
                <div className={stylesOverall.header_area}>
                    <h4>Signin</h4>
                </div>
            </div>
            <hr/>
            {_.isEmpty(user) ? (
                <div className={styles.auth_buttons}>
                    <span>
                        <AuthDialog clientId={clientId}/>
                    </span>
                    <GoogleLogin clientId={clientId} onSuccess={googleResponse} onFailure={googleResponse}
                                 cookiePolicy={'single_host_origin'} render={props => (
                        <button className={googleStyle.google_button} onClick={props.onClick}>
                            <FcGoogle size={28} style={{background: '#fff'}}/>
                            <span>Sign in with Google</span>
                        </button>
                    )}>
                    </GoogleLogin>
                </div>
            ) : (
                <div className={stylesOverall.content}>
                    <p style={{fontWeight: '500'}}>{user.fullName}</p>
                    <p>{user.email}</p>
                </div>
            )}
        </div>
    );
}

export default Signin;