import styles from './Billing.module.css'
import {useState} from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../../pages/api";
import _ from 'lodash'

function Billing({selected, activateNext, index, user}) {

    const dispatch = useDispatch()
    const [newUser, setNewUSer] = useState({email: '', password: ''})

    const handleChange = e => {
        setNewUSer({...newUser, [e.target.name]: e.currentTarget.value})
    }

    const handleSignin = () => {
        dispatch(loginUser(newUser))
    }

    return (
        <div className={selected.active ? `${styles.billing} ${styles.active}` : `${styles.inactive}`}>
            <div className={styles.inputs}>
                <span>
                    <p>Email*</p>
                    <input type='email' name='email' className={styles.input} value={newUser.email}
                           onChange={handleChange}/>
                </span>
                <span>
                    <p>Password*</p>
                    <input type='password' name='password' className={styles.input} value={newUser.password}
                           onChange={handleChange}/>
                </span>
            </div>
            <span className={styles.signin_btn} onClick={handleSignin}>Signin</span>
            <button disabled={_.isEmpty(user)} onClick={() => activateNext(selected, index)}
                    className={_.isEmpty(user) ? `${styles.disabled}` : `${styles.enabled}`}>
                Proceed
            </button>
        </div>
    );
}

export default Billing;