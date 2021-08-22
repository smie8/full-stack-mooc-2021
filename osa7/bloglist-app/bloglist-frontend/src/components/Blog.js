import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotification, setNotificationStyle } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = ({ blogs, user }) => {
    const blogId = useParams().blogid
    const blog = blogs.find(blog => blog.id === blogId)
    const comments = blog.comments
    console.log('this comments', comments)

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

    const blogStyleDetails = {
        fontSize: '0.9em',
        padding: '0.5em 0 0 0',
    }

    const blogStyleTitle = {
        fontWeight: '800',
        cursor: 'pointer',
    }

    const likeButtonStyle = {
        marginLeft: '0.5em',
    }

    if (!blog) {
        return null
    }

    return (
        <div style={blogStyle} className='blogDiv'>
            <span style={blogStyleTitle}>{blog.title} by {blog.author}</span>
            <div className='blogDetails'>
                <div style={blogStyleDetails}>
                    url: {blog.url}<br/>
                    likes: {blog.likes}<button style={likeButtonStyle} onClick={handleBlogLike}>like</button><br/>
                    added by: {blog.user && blog.user[0].name}
                </div>
                <div>
                    comments:
                    <ul>
                        {comments.map(comment =>
                            <li key={comment}>{comment}</li>
                        )}
                    </ul>
                </div>
                <div>
                    {blog.user[0].username === user.username && <button onClick={handleBlogDelete}>remove</button>}
                </div>
            </div>
        </div>
    )
}

export default Blog