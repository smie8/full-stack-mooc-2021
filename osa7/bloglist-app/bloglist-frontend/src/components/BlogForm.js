import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

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
            <Form onSubmit={addBlog}>
                <Form.Group>
                    <Form.Label>title:</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={newBlogTitle}
                        onChange={handleBlogTitleChange}
                        id="title"
                    />
                    <Form.Label>author:</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        value={newBlogAuthor}
                        onChange={handleBlogAuthorChange}
                        id="author"
                    />
                    <Form.Label>url:</Form.Label>
                    <Form.Control
                        type="text"
                        name="url"
                        value={newBlogUrl}
                        onChange={handleBlogUrlChange}
                        id="url"
                    />
                    <Button variant="primary" type="submit">
                        add
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default BlogForm