import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setvotes] = useState(new Uint8Array(anecdotes.length))
  const [mostVotes, setMostVotes] = useState(0)

  const newRandomIndex = () => {
    return Math.floor(Math.random() * anecdotes.length)
  }

  const handleClickNextAnecdote = () => {
    let randomIndex = selected
    while(randomIndex === selected){
      randomIndex = newRandomIndex()
    } 
    setSelected(randomIndex)
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setvotes(copy)

    // check if most voted and set it if needed
    if (votes[selected] > votes[mostVotes]) {
      setMostVotes(selected)
    }
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>

      <button onClick={handleClickNextAnecdote}>next anecdote</button>
      <button onClick={vote}>vote</button>

      <p>
        {anecdotes[selected]}
        <br />
        (has {votes[selected]} votes)
      </p>
      
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVotes]}</p>
    </div>
  )
}

export default App