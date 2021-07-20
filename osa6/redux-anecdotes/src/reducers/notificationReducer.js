const initialState = ''
let timeOut;

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET':
            const newNotification = action.data.content
            console.log(newNotification)
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
        dispatch({
            type: 'SET',
            data: { content }
        })

        if (timeOut) {
            clearTimeout(timeOut)
        }

        timeOut = await setTimeout(() => {
            dispatch({
                type: 'RESET'
            })
        }, secondsToWait * 1000)
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