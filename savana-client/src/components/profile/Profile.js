import styles from "../../pages/account/Account.module.css";
import {useState} from "react";

const genders = ['Male', 'Female']

function Profile({user}) {
    // console.log(user)
    const [update, setUpdate] = useState({firstName: '', lastName: '', email: '', phone: ''})

    const handleChange = e => {
        setUpdate({...update, [e.target.name]: e.currentTarget.value})
    }

    return (
        <div className={styles.user_info}>
            <input className={styles.input} value={update.firstName} onChange={handleChange}
                   name='firstName'/>
            <input className={styles.input} value={update.lastName} onChange={handleChange}
                   name='lastName'/>
            <input type='number' className={styles.input} value={update.phone}
                   onChange={handleChange} name='phone'/>
            <input className={styles.input} disabled value={update.email}
                   onChange={handleChange}/>
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
            <div className={styles.buttons}>
                <button>Cancel</button>
                <button>Save</button>
            </div>
        </div>
    );
}

export default Profile;