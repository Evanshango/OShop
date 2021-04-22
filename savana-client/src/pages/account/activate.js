import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {clearAuthErrors, requestLink, verifyAccount} from "../../api"
import styles from './Activate.module.css'
import RestoreIcon from '@material-ui/icons/Restore'
import {FiCheckCircle} from 'react-icons/fi'
import {BiMessageError} from 'react-icons/bi'
import _ from 'lodash'

function Activate() {
    const dispatch = useDispatch()
    const {token} = useParams()
    const {message, errors, loading} = useSelector(state => state.auth)

    const [email, setEmail] = useState('')
    const [tokenError, setTokenError] = useState('')

    const handleChange = e => {
        if (errors.length > 0) dispatch(clearAuthErrors())
        setEmail(e.target.value)
    }

    const makeRequest = () => dispatch(requestLink({email}))

    console.log(tokenError)

    useEffect(() => {
        try {
            const res = JSON.parse(atob(token.split('.')[1]))
            !_.isEmpty(res) && dispatch(verifyAccount(token))
        } catch (err) {
            setTokenError('Invalid access token')
        }
    }, [token, dispatch])

    const requestNewLink = () => {
        setTokenError('Invalid access token')
        dispatch(clearAuthErrors())
    }

    return (
        <div className={styles.activate_container}>
            {/*{tokenError !== '' || message === 'Activation token expired' ? (*/}
            {tokenError !== '' ? (
                <div className={styles.form_area}>
                    <RestoreIcon className={styles.icon}/>
                    <p>Please enter your email address and click on the button below to request an activation link</p>
                    <input type="email" placeholder="Your registered email address" onChange={handleChange} value={email}/>
                    {loading && (
                        <span style={{textAlign: 'center', paddingTop: '1rem', color: 'red'}}>Please wait...</span>
                    )}
                    {message !== '' && (
                        <div className={styles.message_info}>
                            <span>{message}</span>
                        </div>
                    )}
                    {errors.length > 0 && (
                        <div className={styles.errors}>
                            {errors.map(error => <li key={error.message}>{error.message}</li>)}
                        </div>
                    )}
                    <button className={styles.confirm} onClick={makeRequest} disabled={message !== ''}>Request</button>
                </div>
            ): (
                <div className={styles.confirmation}>
                    {message !== 'Activation token expired' ? (
                        <>
                            <FiCheckCircle size={50} color={'green'}/>
                            <p>{message}</p>
                            <Link to={'/account'}>
                                <button>Signin</button>
                            </Link>
                        </>
                     ): (
                         <>
                             <BiMessageError size={50} color={'red'}/>
                             <p>{message}</p>
                             <button className={styles.request} onClick={requestNewLink}>Request Token</button>
                         </>
                     )
                    }
                </div>
            )}
        </div>
    )
}

export default Activate
