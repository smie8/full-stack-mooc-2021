import React from 'react'
import Togglable from '../components/Togglable'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import { setNotification, setNotificationStyle } from '../reducers/notificationReducer'
// import { createBlog, likeBlog, deleteBlog } from '../reducers/blogReducer'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

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
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} user={user} />
            )}
        </div>
    )
}

export default Blogs