const initialState = { message: '', style: '' }
let timeOut

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'SET_MESSAGE': {
        const newState = { message: action.data.message, style: state.style }
        return newState
    }
    case 'RESET': {
        const resetedState = { message: '', style: state.style }
        // resetedState.message = ''
        return resetedState
    }
    case 'SET_STYLE': {
        const newState = state
        newState.style = action.data.style
        return newState
    }
    default:
        return state
    }
}

export default notificationReducer

export const setNotification = (message) => {
    return async dispatch => {
        dispatch({
            type: 'SET_MESSAGE',
            data: { message }
        })

        if (timeOut) {
            clearTimeout(timeOut)
        }

        timeOut = await setTimeout(() => {
            dispatch({ type: 'RESET' })
        }, 3000)
    }
}

export const setNotificationStyle = (style) => {
    return {
        type: 'SET_STYLE',
        data: { style }
    }
}

