import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
    if (!users) {
        return null
    }

    return (
        <div>
            <h2>Users</h2>
            <ul>
                {users.map(u =>
                    <li key={u.username}><Link to={`/user/${u.id}`}>{u.name}, {u.blogs.length} blogs</Link></li>
                )}
            </ul>
        </div>
    )
}

export default Users