import React from 'react'

const User = ({ user, blogs }) => {

    if (!user) {
        return null
    }

    const ownBlogs = blogs.filter(blog => blog.user.id === user.id)

    return (
        <div>
            <h2>{user.name}</h2>
            added blogs
            <br/>
            {ownBlogs && ownBlogs.map(blog =>
                <div key={blog.id}>{blog.title} by {blog.author} ({blog.url}), likes {blog.likes}</div>
            )}
        </div>
    )
}

export default User