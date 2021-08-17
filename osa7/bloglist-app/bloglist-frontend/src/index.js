import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import App from './App'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer
})

// const store = createStore(
//     notificationReducer,
//     composeWithDevTools(
//         applyMiddleware(thunk))
// )
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk))
)

store.subscribe(() => {
    const storeNow = store.getState()
    console.log('store has changed: ', storeNow)
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)