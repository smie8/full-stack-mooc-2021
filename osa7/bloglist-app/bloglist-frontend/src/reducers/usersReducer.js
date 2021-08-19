import userService from '../services/users'

const userReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT_USERS': {
        return action.data.users
    }
    default:
        return state
    }
}

export default userReducer

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getUsers()
        dispatch({
            type: 'INIT_USERS',
            data: { users }
        })
    }
}