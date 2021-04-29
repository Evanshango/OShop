import React, {useEffect, useState} from 'react'
import styles from './Signin.module.css'
import {useDispatch, useSelector} from "react-redux"
import {activateOrganization, authUser, clearAuthError, clearOrgErrors} from "../api"
import {Input} from "./input/Input"
import {useHistory, useLocation} from 'react-router-dom'
import _ from "lodash"
import {CircularProgress} from "@material-ui/core"
import LinkDialog from "./dialogs/LinkDialog"

function Signin() {
    const {pathname} = useLocation()
    const history = useHistory()
    const [user, setUser] = useState({email: '', password: ''})
    const [option, setOption] = useState('admin')
    const {message} = useSelector(state => state.organization)
    const {loading, errors} = useSelector(state => state.user)
    const [tokenError, setTokenError] = useState('')

    const dispatch = useDispatch()

    const handleChange = e => {
        if (errors.length > 0) dispatch(clearAuthError())
        if (message !== '') dispatch(clearOrgErrors())
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(authUser(user, option))
    }

    useEffect(() => {
        const token = pathname.split('/')[1]
        if (token) {
            try {
                const res = JSON.parse(atob(token.split('.')[1]))
                !_.isEmpty(res) && dispatch(activateOrganization(token, history))
            } catch (err) {
                setTokenError('Invalid token')
            }
        }
    }, [pathname])

    return (
        <div className={styles.login_screen}>
            <div className={styles.login_form}>
                <h3>Signin</h3>
                {message !== '' && (
                    <div className={styles.success}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <p style={{margin: '0'}}>Signin as:</p>
                    <select name="option" className="form-control" onChange={e => setOption(e.currentTarget.value)}>
                        <option value="admin">Admin</option>
                        <option value="organization">Organization</option>
                    </select>
                    <Input name={'email'} placeholder={'Email'} type={'email'} onchange={handleChange}
                           label={'Email*'}/>
                    <Input name={'password'} placeholder={'Password'} type={'password'} onchange={handleChange}
                           label={'Password*'}/>

                    <button type="submit" disabled={loading}>
                        {loading && <CircularProgress color={'secondary'}/>}
                        Signin
                    </button>
                    {tokenError !== '' && (
                        <div className={styles.errors}>
                            <li>{tokenError}</li>
                        </div>
                    )}
                    {errors.length > 0 && (
                        <div className={styles.errors}>
                            {errors.map((error, index) => error.message.includes('activation') ? (
                                    <div style={{textAlign: 'center'}} key={index}>
                                        <li>{error.message} | OR</li>
                                        <LinkDialog/>
                                    </div>
                                ) : (
                                    <li key={index}>{error.message}</li>
                                )
                            )}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Signin
