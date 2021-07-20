import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const votedAnecdote = state.find(anecdote => anecdote.id == action.votedAnecdote.id)
      const newState = state.map(anecdote => 
        anecdote.id !== action.votedAnecdote.id ? anecdote : votedAnecdote)
      return newState
    case 'CREATE':
      return [...state, action.data.content]
    case 'INIT_ANECDOTES':
      return action.data.content
    default:
      return state
  }
}

export default anecdoteReducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: { content: anecdotes }
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'CREATE',
      data: { content: newAnecdote }
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    anecdote.votes += 1
    const votedAnecdote = await anecdoteService.voteAnecdote(anecdote)
    dispatch({
      type: 'VOTE',
      votedAnecdote
    })
  }
}