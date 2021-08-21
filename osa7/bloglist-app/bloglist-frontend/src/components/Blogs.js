import React from 'react'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
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
            <Togglable buttonLabel="add blog" idProp="create-new" ref={blogFormRef}>
                <BlogForm createBlog={handleCreateBlog} user={user} />
            </Togglable>
            <ol>
                {blogs.map(blog =>
                    <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></li>
                )}
            </ol>
        </div>
    )
}

export default Blogs