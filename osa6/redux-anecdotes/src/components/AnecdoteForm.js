import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { resetNotification, setNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`added new anecdote: "${content}"`))
        setTimeout(() => {
            dispatch(resetNotification())
        }, 5000)
    } 

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="content" /></div>
                <button type="submit">create</button>
            </form>
            <br/>
        </div>
    )
}

export default NewAnecdote
