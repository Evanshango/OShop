import React, {useEffect} from 'react'
import {useSelector} from "react-redux"
import {useHistory} from "react-router-dom"

function Admins() {
    const history = useHistory()
    const {user} = useSelector(state => state.user)

    useEffect(() => {
        if (!user.role) {
            history.push('/')
        }
    }, [user])
    return (
        <div>
            Admins Component
        </div>
    )
}

export default Admins
