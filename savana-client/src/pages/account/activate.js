import React from 'react'
import {useParams} from "react-router-dom"
import {useDispatch} from "react-redux"
import {activateAccount} from "../../api"
import styles from './Activate.module.css'

function Activate() {
    const dispatch = useDispatch()
    const {token} = useParams()

    const confirmAccount = () => dispatch(activateAccount(token))

    return (
        <div className={styles.activate_container}>
            <div style={{marginTop: '10rem', textAlign: 'center'}}>
                <p>Please click on the button below to activate your account</p>
                <button className={styles.confirm} onClick={confirmAccount}>Confirm</button>
            </div>
        </div>
    )
}

export default Activate
