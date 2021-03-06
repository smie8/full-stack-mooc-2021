import React, { useState } from 'react'

// const BlogForm = ({ onSubmit, newBlogTitle, handleBlogTitleChange, newBlogAuthor, handleBlogAuthorChange, newBlogUrl, handleBlogUrlChange }) => {
const BlogForm = ({ createBlog, user }) => {
    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')

    const handleBlogTitleChange = (event) => {
        setNewBlogTitle(event.target.value)
    }

    const handleBlogAuthorChange = (event) => {
        setNewBlogAuthor(event.target.value)
    }

    const handleBlogUrlChange = (event) => {
        setNewBlogUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl,
            user: user
        })

        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
    }

    return (
        <div className='blogForm'>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                title:
                <input
                    id='title'
                    value={newBlogTitle}
                    onChange={handleBlogTitleChange}
                />
                <br/>
                author:
                <input
                    id='author'
                    value={newBlogAuthor}
                    onChange={handleBlogAuthorChange}
                />
                <br/>
                url:
                <input
                    id='url'
                    value={newBlogUrl}
                    onChange={handleBlogUrlChange}
                />
                <br/>
                <button id='submit-blog' type="submit">add</button>
            </form>
        </div>
    )
}

export default BlogForm