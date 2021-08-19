import React from 'react'

const Users = ({ users }) => {

    if (!users) {
        return null
    }

    return (
        <div>
            <h2>Users</h2>
            {users.map(user =>
                <div key={user.username}>{user.name}, {user.blogs.length} blogs</div>
            )}
        </div>
    )
}

export default Users