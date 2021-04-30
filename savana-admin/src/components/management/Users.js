import React, {useState} from 'react'
import UserDialog from "../dialogs/UserDialog"
import styles from './../dialogs/User.module.css'
import {Form, Table} from "react-bootstrap"

function Users() {
    const [param, setParam] = useState('')
    const handleSubmit = e => {
        e.preventDefault()
    }
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
                </Table>
            </div>
        </>
    );
}

export default Users;
