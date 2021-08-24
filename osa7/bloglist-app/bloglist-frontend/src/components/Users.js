import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {
    if (!users) {
        return null
    }

    return (
        <div>
            <h3>Users</h3>
            <Table striped>
                <tbody>
                    {users.map(u =>
                        <tr key={u.username}>
                            <td>
                                <Link to={`/user/${u.id}`}>{u.name}, {u.blogs.length} blogs</Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Users