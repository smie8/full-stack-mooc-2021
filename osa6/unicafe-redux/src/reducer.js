const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const goodIncremented = state.good + 1
      return { ...state, good: goodIncremented }
    case 'OK':
      const okIncremented = state.ok + 1
      return { ...state, ok: okIncremented }
    case 'BAD':
      const badIncremented = state.bad + 1
      return { ...state, bad: badIncremented }
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer