import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({ blogs, users }) => {
    const userId = useParams().userid

    if (!userId) {
        return null
    }

    const ownBlogs = blogs.filter(blog => blog.user[0].id === userId)
    const user = users.find(user => user.id === userId)

    return (
        <div>
            <h3>{user.name}</h3>
            <h4>added blogs</h4>
            <ul>
                {ownBlogs && ownBlogs.map(blog =>
                    <li key={blog.id}>{blog.title} by {blog.author} ({blog.url}), likes {blog.likes}</li>
                )}
            </ul>
        </div>
    )
}

export default User