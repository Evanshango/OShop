import React, {useEffect, useState} from 'react'
import OrgDialog from "../dialogs/OrgDialog"
import styles from './Organization.module.css'
import {useDispatch, useSelector} from "react-redux"
import {fetchOrganizationUsers, formatDate, searchOrganizations} from "../../api"
import {Badge, Form, Table} from "react-bootstrap"
import Pagination from "../pagination/Pagination"
import {useHistory} from 'react-router-dom'

function Organizations() {
    const dispatch = useDispatch()
    const history = useHistory()
    const {organizations, pages} = useSelector(state => state.organization)
    const {user} = useSelector(state => state.user)
    const [param, setParam] = useState('')
    const [page, setPage] = useState(1)

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(searchOrganizations(param))
    }

    useEffect(() => {
        if (!user.role){
            history.push('/')
        }
    }, [user])


    return (
        <div className={styles.org_container}>
            <OrgDialog/>
            <div className={styles.search_area}>
                <Form style={{display: 'flex'}} onSubmit={handleSubmit}>
                    <Form.Control type={'text'} placeholder={'Search by Organization Name/Email'} value={param}
                                  onChange={e => setParam(e.currentTarget.value)}/>
                    <button className="btn btn-outline-primary ml-3" type={'submit'}>Search</button>
                </Form>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Organization ID</th>
                    <th>Organization Name</th>
                    <th>Organization Email</th>
                    <th>Total Users</th>
                    <th>Status</th>
                    <th>Registration Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {organizations && organizations.map((organization, index) => (
                    <tr key={organization.id}>
                        <td>{index + 1}</td>
                        <td>{organization.id}</td>
                        <td>{organization.name}</td>
                        <td>{organization.email}</td>
                        <td>{organization.userCount}</td>
                        <td>
                            <Badge variant={organization.verified ? 'success' : 'warning'}>
                                {organization.verified ? 'VERIFIED' : 'UNVERIFIED'}
                            </Badge>
                        </td>
                        <td>{formatDate(organization.createdAt)}</td>
                        <OrgDialog organization={organization}/>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div className={styles.pagination}>
                {organizations.length > 0 && (
                    <Pagination current={page} pages={pages} onClick={setPage}/>
                )}
            </div>
        </div>
    )
}

export default Organizations
