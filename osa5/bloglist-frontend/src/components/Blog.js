import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
    const [detailsVisible, setDetailsVisible] = useState(false)
    const showWhenVisible = { display: detailsVisible ? '' : 'none' }

    const toggleDetailsVisibility = () => {
        setDetailsVisible(!detailsVisible)
    }

    const handleBlogLike = () => {
        likeBlog({
            title: blog.title,
            author: blog.author,
            likes: blog.likes + 1,
            url: blog.url,
            user: blog.user,
            id: blog.id
        },
        blog.id)
    }

    const handleBlogDelete = () => {
        deleteBlog(blog.title, blog.id)
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

    return (
        <div style={blogStyle}>
            <span onClick={toggleDetailsVisibility} style={blogStyleTitle}>{blog.title} {blog.author}</span>
            <div style={showWhenVisible}>
                <div style={blogStyleDetails}>
          url: {blog.url}<br/>
          likes: {blog.likes}<button style={likeButtonStyle} onClick={handleBlogLike}>like</button><br/>
          added by: {blog.user && blog.user[0].name}
                </div>
                <div>
                    {blog.user[0].username === user.username && <button onClick={handleBlogDelete}>remove</button>}
                </div>
            </div>
        </div>
    )
}

export default Blog