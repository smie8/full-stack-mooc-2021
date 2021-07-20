import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.content.value
        event.target.content.value = ''
        props.setNotification(`added new anecdote: "${content}"`, 5)
        props.createAnecdote(content)
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

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}
const ConnectedNewAnecdote = connect(null, mapDispatchToProps)(NewAnecdote)
export default ConnectedNewAnecdote
