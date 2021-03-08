import React, {useState} from 'react';
import styles from './Profile.module.css'
import Auth from "../../components/auth/Auth";
import _ from 'lodash'
import {AiOutlineHeart, AiOutlineProfile} from 'react-icons/ai'
import {FiBox, FiLogOut, FiMapPin} from 'react-icons/fi'
import {useSelector} from "react-redux";

const navigation = [
    {
        id: 1,
        name: 'My Profile',
        icon: <AiOutlineProfile/>
    },
    {
        id: 2,
        name: 'My Orders',
        icon: <FiBox/>
    },
    {
        id: 3,
        name: 'Wishlist',
        icon: <AiOutlineHeart/>
    },
    {
        id: 4,
        name: 'Address',
        icon: <FiMapPin/>
    },
    {
        id: 5,
        name: 'Signout',
        icon: <FiLogOut/>
    }
]

const genders = ['Male', 'Female']

const test = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    phone: 254712345678
}

const AccountPage = ({clientId, user}) => {
    const {token} = useSelector(state => state.user)
    const [testUser, setTestUser] = useState({...test})
    const [activeIndex, setActiveIndex] = useState(0)
    const [nav, setNav] = useState(navigation[0])

    const handleChange = e => {
        setTestUser({...testUser, [e.target.name]: e.currentTarget.value})
    }

    const handleClick = (item, index) => {
        setActiveIndex(index)
        if (item.name !== 'Signout') {
            setNav(item)
        }
    }

    const renderContent = (
        <span style={{padding: '1rem 0'}}>
            {(() => {
                switch (nav.name) {
                    case "My Profile":
                        return (
                            <>
                                <div className={styles.user_info}>
                                    <input className={styles.input} value={testUser.firstName} onChange={handleChange}
                                           name='firstName'/>
                                    <input className={styles.input} value={testUser.lastName} onChange={handleChange}
                                           name='lastName'/>
                                    <input type='number' className={styles.input} value={testUser.phone}
                                           onChange={handleChange} name='phone'/>
                                    <input className={styles.input} disabled value={testUser.email}
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
                            </>
                        )
                    case 'My Orders':
                        return (
                            <p>Orders</p>
                        )
                    case 'Wishlist':
                        return (
                            <p>wishlist</p>
                        )
                    case 'Address':
                        return (
                            <p>Address</p>
                        )
                }
            })()}
        </span>
    )

    return (
        <div className={styles.profile}>
            {token !== '' ? (
                <div className={styles.info}>
                    <div className={styles.name_area}>
                        <img src={'/img_home.jpg'} alt="user"/>
                        <h3>{testUser.firstName} {testUser.lastName}</h3>
                        <h5>{testUser.email}</h5>
                        <p>+{testUser.phone}</p>
                    </div>
                    <div className={styles.info_container}>
                        <div className={styles.navigation}>
                            {navigation.map((nav, index) => (
                                <span key={nav.id} onClick={() => handleClick(nav, index)}
                                      className={activeIndex === index ? `${styles.active}` : `${styles.inactive}`}>
                                   <p>
                                       <span>{nav.icon} {nav.name}</span>
                                   </p>
                                    {index !== navigation.length - 1 && <hr/>}
                               </span>
                            ))}
                        </div>
                        <div className={styles.information}>
                            <span>{nav.icon} <h3>{nav.name}</h3></span>
                            {renderContent}
                        </div>
                    </div>
                </div>
            ) : (
                <Auth clientId={clientId}/>
            )}
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

export default AccountPage;