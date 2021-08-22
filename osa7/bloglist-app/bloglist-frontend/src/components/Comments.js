import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import { setNotification, setNotificationStyle } from '../reducers/notificationReducer'
import { v4 as uuid_v4 } from 'uuid'
import Notification from '../components/Notification'

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
            comments:
            <ul>
                {comments.map(comment =>
                    <li key={uuid_v4()}>{comment}</li>
                )}
            </ul>
            <form onSubmit={addComment}>
                <input
                    id='comment'
                    value={newComment}
                    onChange={handleCommentChange}
                />
                <button id='submit-comment' type="submit">add comment</button>
            </form>
            <br/>
            <Notification />
        </div>
    )
}

export default Comments