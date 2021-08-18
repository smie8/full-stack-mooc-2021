const userReducer = (state = { username: '', password: '' }, action) => {
    switch (action.type) {
    case 'SET_USER': {
        return action.data.user
    }
    // case 'SET_USERNAME': {
    //     const newState = state
    //     newState.username = action.data.username
    //     return newState
    // }
    // case 'SET_PASSWORD': {
    //     const newState = state
    //     newState.password = action.data.password
    //     return newState
    // }
    default:
        return state
    }
}

export default userReducer

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        data: { user }
    }
}

// export const setUsername = (username) => {
//     return {
//         type: 'SET_USER',
//         data: { username }
//     }
// }

// export const setPassword = (password) => {
//     return {
//         type: 'SET_PASSWORD',
//         data: { password }
//     }
// }
