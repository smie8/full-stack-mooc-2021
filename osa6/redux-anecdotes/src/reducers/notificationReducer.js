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

export const setNotification = (content) => {
    return {
        type: 'SET',
        data: {
            content
        }
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