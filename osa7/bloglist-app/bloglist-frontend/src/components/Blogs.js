import React from 'react'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { Table } from 'react-bootstrap'
import { setNotification, setNotificationStyle } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs, user }) => {
    if (!blogs) {
        return null
    }

    const dispatch = useDispatch()
    const blogFormRef = React.useRef()

    const handleCreateBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()

        try {
            dispatch(createBlog(blogObject))
            dispatch(setNotificationStyle('success'))
            dispatch(setNotification(`Added "${blogObject.title}" to blogs`))
        } catch (exception) {
            console.log(exception)
            dispatch(setNotificationStyle('error'))
            dispatch(setNotification(exception.message))
        }
    }

    return (
        <div>
            <h3>Blogs</h3>
            <Togglable buttonLabel="add blog" idProp="create-new" ref={blogFormRef}>
                <BlogForm createBlog={handleCreateBlog} user={user} />
            </Togglable>
            <Table striped>
                <tbody>
                    {blogs.map(blog =>
                        <tr key={blog.id}>
                            <td>
                                <Link to={`/blogs/${blog.id}`}>
                                    {blog.title} by {blog.author}
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Blogs