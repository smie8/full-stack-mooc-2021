import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdotes
        } else {
            return state.anecdotes.filter(anecdote => 
                anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
        }
    })
    anecdotes.sort((a, b) => b.votes - a.votes)

    const vote = (anecdote) => {
        dispatch(voteAnecdote(anecdote))
        dispatch(setNotification(`you voted "${anecdote.content}"`, 5))
    }

    return (
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
        )}
        </div>

    )
}

export default AnecdoteList