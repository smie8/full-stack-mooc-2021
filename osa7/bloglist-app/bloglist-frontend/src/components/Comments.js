import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import { setNotification, setNotificationStyle } from '../reducers/notificationReducer'
import { v4 as uuid_v4 } from 'uuid'
import { Table, Form, Button } from 'react-bootstrap'

const Comments = ({ comments, id }) => {
    const [newComment, setNewComment] = useState('')
    const dispatch = useDispatch()

    const handleCommentChange = (event) => {
        setNewComment(event.target.value)
    }

    const addComment = (event) => {
        event.preventDefault()
        const commentObj = { comment: newComment }

        try {
            dispatch(commentBlog(id, commentObj))
            dispatch(setNotificationStyle('success'))
            dispatch(setNotification('Added comment'))
        } catch (exception) {
            console.log(exception)
            dispatch(setNotificationStyle('error'))
            dispatch(setNotification(exception.message))
        }

        setNewComment('')
    }

    return (
        <div>
            <h4>comments</h4>
            <Table striped>
                <tbody>
                    {comments && comments.map(comment =>
                        <tr key={uuid_v4()}>
                            <td>
                                {comment}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Form onSubmit={addComment}>
                <Form.Group>
                    <Form.Control
                        id='comment'
                        value={newComment}
                        onChange={handleCommentChange}
                    />
                    <Button variant="primary" type="submit">
                        add comment
                    </Button>
                </Form.Group>
            </Form>
            <br/>
        </div>
    )
}

export default Comments