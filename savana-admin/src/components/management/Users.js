import React, {useEffect, useState} from 'react'
import UserDialog from "../dialogs/UserDialog"
import styles from './../dialogs/User.module.css'
import {Badge, Form, Table} from "react-bootstrap"
import {fetchOrganizationUsers, formatDate} from "../../api"
import {useDispatch, useSelector} from "react-redux"

function Users() {
    const dispatch = useDispatch()
    const {users} = useSelector(state => state.organization.users)
    const [param, setParam] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
    }

    useEffect(() => {
        dispatch(fetchOrganizationUsers())
    }, [dispatch])

    return (
        <>
            <UserDialog/>
            <div className={styles.user_search}>
                <Form style={{display: 'flex'}} onSubmit={handleSubmit} className='w-100'>
                    <Form.Control type={'text'} placeholder={'Search by Name/Email'} value={param}
                                  onChange={e => setParam(e.currentTarget.value)}/>
                    <button className="btn btn-outline-primary ml-3" type={'submit'}>Search</button>
                </Form>
            </div>
            <div>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Avatar</th>
                        <th>Organization</th>
                        <th>Status</th>
                        <th>Registration Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users && users.length > 0 && users.map((user, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>
                                <img src={user.avatar} alt={user.firstName} className={styles.avatar}/>
                            </td>
                            <td>{user.organization.name}</td>
                            <td>
                                <Badge variant={user.verified ? 'success' : 'danger'}>
                                    {user.verified ? 'VERIFIED': 'UNVERIFIED'}
                                </Badge>
                            </td>
                            <td>{formatDate(user.createdAt)}</td>
                            <td>Edit/Delete</td>
                        </tr>
                    ))}
                    {/*{users && users.map((user, index) => (*/}
                    {/*    // <tr key={index}>*/}
                    {/*    //     <td>{index + 1}</td>*/}
                    {/*    //     <td>{user.id}</td>*/}
                    {/*    // </tr>*/}
                    {/*))}*/}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Users;
