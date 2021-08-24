import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotification, setNotificationStyle } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import Comments from '../components/Comments'
import Notification from '../components/Notification'

const Blog = ({ blogs, user }) => {
    const blogId = useParams().blogid
    const blog = blogs.find(blog => blog.id === blogId)

    if (!blog) {
        return (
            <Notification />
        )
    }

    const comments = blog.comments
    const dispatch = useDispatch()

    const handleBlogLike = async () => {
        const likedBlogObject = {
            title: blog.title,
            author: blog.author,
            likes: blog.likes + 1,
            url: blog.url,
            user: blog.user,
            id: blog.id
        }
        try {
            dispatch(likeBlog(blog.id, likedBlogObject))
            dispatch(setNotificationStyle('success'))
            dispatch(setNotification(`Liked "${blog.title}"`))
        } catch(exception) {
            console.log(exception)
            dispatch(setNotificationStyle('error'))
            dispatch(setNotification(exception.message))
        }
    }

    const handleBlogDelete = async () => {
        if (window.confirm(`Remove blog "${blog.title}"?`)) {
            try {
                dispatch(deleteBlog(blog.id))
                dispatch(setNotificationStyle('delete'))
                dispatch(setNotification(`Deleted blog: "${blog.title}"`))
            } catch(exception) {
                console.log(exception)
                dispatch(setNotificationStyle('error'))
                dispatch(setNotification(exception.message))
            }
        }
    }

    const blogStyle = {
        padding: '1em 0em 1em 0.5em',
        border: '1px solid',
        margin: '1em 0 1em 0',
    }

    return (
        <div style={blogStyle} className='blogDiv'>
            <Notification />
            <h4>{blog.title} by {blog.author}</h4>
            <div className='blogDetails'>
                <Table>
                    <tbody>
                        <tr>
                            <td>url:</td>
                            <td>{blog.url}</td>
                        </tr>
                        <tr>
                            <td>added by:</td>
                            <td>{blog.user && blog.user[0].name}</td>
                        </tr>
                        <tr>
                            <td>likes:</td>
                            <td>{blog.likes}</td>
                        </tr>
                    </tbody>
                </Table>
                <Button variant='success' onClick={handleBlogLike}>like</Button>
                <br/><br/>
                <Comments comments={comments} id={blog.id} />
                <div>
                    {blog.user[0].username === user.username && <button onClick={handleBlogDelete}>remove</button>}
                </div>
            </div>
        </div>
    )
}

export default Blog