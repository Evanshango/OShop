import React from 'react';
import OrgDialog from "../dialogs/OrgDialog"
import styles from './Organization.module.css'
import {useSelector} from "react-redux"
import {formatDate} from "../../api"

function Organizations() {
    const {organizations} = useSelector(state => state.organization)
    return (
        <div className={styles.org_container}>
            <OrgDialog/>
            <table width='100%' cellPadding={0} cellSpacing={0} className={styles.organization_table}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Organization ID</th>
                    <th>Organization Name</th>
                    <th>Organization Email</th>
                    <th>Total Users</th>
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
                        <td>{formatDate(organization.createdAt)}</td>
                        <OrgDialog organization={organization}/>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Organizations;
