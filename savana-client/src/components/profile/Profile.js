import styles from "../../pages/account/Account.module.css";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import _ from 'lodash'

const genders = ['Male', 'Female']

function Profile() {
    const {user} = useSelector(state => state.current)
    const [update, setUpdate] = useState({firstName: '', lastName: '', email: ''})

    const handleChange = e => {
        setUpdate({...update, [e.target.name]: e.currentTarget.value})
    }

    useEffect(() => {
        if (!_.isEmpty(user)){
            setUpdate({firstName: user.firstName, lastName: user.lastName, email: user.email})
        }
    }, [user])

    return (
        <div className={styles.user_info}>
            <input className={styles.input} disabled value={update && update.firstName} name='firstName'
            onChange={handleChange}/>
            <input className={styles.input} disabled value={update && update.lastName} name='lastName'
                   onChange={handleChange}/>
            <input className={styles.input} disabled value={update && update.email} onChange={handleChange}/>
            <div className={styles.gender_area}>
                <p>Gender</p>
                <div className={styles.gender_items}>
                    {genders.map(gender => (
                        <span key={gender}>
                            <input type="radio" name='gender' id='gender' value={gender}/>
                            <label htmlFor="gender">{gender}</label>
                        </span>
                    ))}
                </div>
            </div>
            {/*<div className={styles.buttons}>*/}
            {/*    <button>Cancel</button>*/}
            {/*    <button>Save</button>*/}
            {/*</div>*/}
        </div>
    );
}

export default Profile;