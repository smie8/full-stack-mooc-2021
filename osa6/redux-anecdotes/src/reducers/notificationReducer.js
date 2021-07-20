const initialState = ''

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET':
            const newNotification = action.data.content
            return newNotification
        case 'RESET':
            return ''
        default:
            return state
    }
}

export default notificationReducer

export const setNotification = (content, secondsToWait) => {
    return async dispatch => {
        const delay = ms => new Promise(response => setTimeout(response, ms))
        dispatch({
            type: 'SET',
            data: { content }
        })
        await delay(secondsToWait * 1000)
        dispatch({
            type: 'RESET',
        })
    }
}

export const resetNotification = () => {
    return {
        type: 'RESET',
        data: {
            content: ''
        }
    }
}