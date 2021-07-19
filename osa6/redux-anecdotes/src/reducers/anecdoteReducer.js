const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      const anecdoteToChange = state.find(anecdote => anecdote.id == action.data.id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const newState = state.map(anecdote => 
        anecdote.id !== action.data.id ? anecdote : changedAnecdote)
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

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: { content: anecdotes }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE',
    data: {
      content: content
    }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}