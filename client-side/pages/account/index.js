import React, {useState} from 'react';
import styles from './Profile.module.css'
import Auth from "../../components/auth/Auth";
import {AiOutlineHeart, AiOutlineProfile} from 'react-icons/ai'
import {FiBox, FiLogOut, FiMapPin} from 'react-icons/fi'
import {useDispatch, useSelector} from "react-redux";
import Orders from "../../components/orders/Orders";
import Profile from "../../components/profile/Profile";
import {signOut} from "../api";

const navigation = [
    {id: 1, name: 'My Profile', icon: <AiOutlineProfile/>},
    {id: 2, name: 'My Orders', icon: <FiBox/>},
    {id: 3, name: 'Wishlist', icon: <AiOutlineHeart/>},
    {id: 4, name: 'Address', icon: <FiMapPin/>},
    {id: 5, name: 'Signout', icon: <FiLogOut/>}
]

const AccountPage = ({clientId, user}) => {
    const dispatch = useDispatch()
    const {token} = useSelector(state => state.user)
    const [activeIndex, setActiveIndex] = useState(0)
    const [nav, setNav] = useState(navigation[0])

    const handleClick = (item, index) => {
        setActiveIndex(index)
        if (item.name !== 'Signout') {
            setNav(item)
        } else {
            console.log('signing out')
            dispatch(signOut())
        }
    }

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