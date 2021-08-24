import React from 'react'
import { useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const User = ({ blogs, users }) => {
    const userId = useParams().userid

    if (!userId) {
        return null
    }

    const ownBlogs = blogs.filter(blog => blog.user[0].id === userId)
    const user = users.find(user => user.id === userId)

    return (
        <div>
            <h3>User: {user.name}</h3>
            <h5>added blogs</h5>
            <Table striped>
                <tbody>
                    {ownBlogs.length > 0 ?
                        blogs.map(blog =>
                            <tr key={blog.id}>
                                <td key={blog.id}>
                                    {blog.title} by {blog.author} ({blog.url}),
                                    likes {blog.likes}
                                </td>
                            </tr>
                        )
                        : <tr><td>no blogs</td></tr>
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default User