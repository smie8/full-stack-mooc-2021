import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from 'react-router-dom'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification, setNotificationStyle } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)
    const padding = { padding: 5 }

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
        console.log('users', users)
    }, [dispatch])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const loginUser = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(loginUser)
            )
            blogService.setToken(loginUser.token)
            dispatch(setUser(loginUser))
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setNotificationStyle('error'))
            dispatch(setNotification('wrong username or password'))
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setUser(null))
    }

    if (user === null) {
        return (
            <div>
                <Notification />
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleSubmit={handleLogin}
                />
            </div>
        )
    }

    return (
        <Router>
            <div>
                <h2>Blog app</h2>
                <div>
                    <Link style={padding} to="/">blogs</Link>
                    <Link style={padding} to="/users">users</Link>
                    <span style={padding}>{user.name} logged in</span>
                    <button onClick={handleLogout}>logout</button>
                </div>
            </div>
            <div>

            </div>
            <Switch>
                <Route path="/users">
                    <Users users={users} />
                </Route>
                <Route path="/user/:userid">
                    <User blogs={blogs} users={users} />
                </Route>
                <Route path="/blog/:blogid">
                    <Blog user={user} />
                </Route>
                <Route path="/">
                    <Notification />
                    <Blogs blogs={blogs} user={user} />
                </Route>
            </Switch>
        </Router>
    )
}

export default App