import React, {useEffect, useState} from 'react';
import styles from './Account.module.css'
import {AiOutlineHeart, AiOutlineProfile} from 'react-icons/ai'
import {FiBox, FiLogOut, FiMapPin} from 'react-icons/fi'
import {useDispatch, useSelector} from "react-redux";
import {clearPaymentValues, signOut} from "../../api";
import Profile from "../../components/profile/Profile";
import Orders from "../../components/orders/Orders";
import Auth from "../../components/auth/Auth";
import _ from 'lodash'

const navigation = [
    {id: 1, name: 'My Profile', icon: <AiOutlineProfile/>},
    {id: 2, name: 'My Orders', icon: <FiBox/>},
    {id: 3, name: 'Wishlist', icon: <AiOutlineHeart/>},
    {id: 4, name: 'Address', icon: <FiMapPin/>},
    {id: 5, name: 'Signout', icon: <FiLogOut/>}
]

function Account({user}) {
    const dispatch = useDispatch()
    const {token} = useSelector(state => state.auth)
    const {payment} = useSelector(state => state.paypal)
    const [activeIndex, setActiveIndex] = useState(0)
    const [nav, setNav] = useState(navigation[0])

    const handleClick = (item, index) => {
        setActiveIndex(index)
        item.name !== 'Signout' ? setNav(item) : dispatch(signOut())
    }

    useEffect(() => {
        if (!_.isEmpty(payment)){
            dispatch(clearPaymentValues())
        }
    }, [dispatch, payment])

    const renderContent = (
        <span style={{padding: '1rem 0'}}>
            {(() => {
                switch (nav.name) {
                    case "My Profile":
                        return <Profile user={user}/>
                    case 'My Orders':
                        return <Orders/>
                    case 'Wishlist':
                        return (
                            <p>wishlist</p>
                        )
                    case 'Address':
                        return (
                            <p>Address</p>
                        )
                    default:
                    // do nothing
                }
            })()}
        </span>
    )

    return (
        <div className={styles.profile}>
            {token !== '' ? (
                <div className={styles.info}>
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
                <Auth clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}/>
            )}
        </div>
    );
}

export default Account;