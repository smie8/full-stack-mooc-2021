import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notificationText, setNotificationText] = useState('')
    const [notificationStyle, setNotificationStyle] = useState('')
    const blogFormRef = React.useRef()

    useEffect(() => {
        blogService.getAllBlogs().then(blogs =>
            setBlogs( blogs.sort((a, b) => { return b.likes - a.likes }) )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setNotificationStyle('error')
            activateNotification('wrong username or password')
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogService
            .createBlog(blogObject)
            .then(returnedBlog => {
                returnedBlog.user = [user]
                setBlogs(blogs
                    .concat(returnedBlog)
                    .sort((a, b) => { return b.likes - a.likes })
                )
                setNotificationStyle('success')
                activateNotification(`Added "${blogObject.title}" to blogs`)
            })
            .catch(error => {
                console.log(error)
                setNotificationStyle('error')
                activateNotification(error.message)
            })
    }

    const likeBlog = async (blogObject, id) => {
        blogService
            .updateBlog(id, blogObject)
            .then((returnedBlog) => {
                setBlogs(blogs
                    .map((blog) => (blog.id === id ? returnedBlog : blog))
                    .sort((a, b) => { return b.likes - a.likes })
                )
                setNotificationStyle('success')
                activateNotification(`Liked "${blogObject.title}"`)
            })
            .catch(error => {
                console.log(error)
                setNotificationStyle('error')
                activateNotification(error.message)
            })
    }

    const deleteBlog = async (blogTitle, id) => {
        if (window.confirm(`Remove blog "${blogTitle}"?`)) {
            blogService
                .deleteBlog(id)
                .then(() => {
                    setBlogs(blogs
                        .filter((blog) => blog.id !== id)
                        .sort((a, b) => { return b.likes - a.likes })
                    )
                    setNotificationStyle('delete')
                    activateNotification(`Deleted blog: "${blogTitle}"`)
                })
                .catch(error => {
                    console.log(error)
                    setNotificationStyle('error')
                    activateNotification(error.message)
                })
        }
    }

    const activateNotification = (message) => {
        setNotificationText(message)
        setTimeout(() => {
            setNotificationText(null)
        }, 5000)
    }

    if (user === null) {
        return (
            <div>
                <Notification notificationText={notificationText} notificationStyle={notificationStyle} />
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
        <div>
            <h2>blogs</h2>
            <Notification notificationText={notificationText} notificationStyle={notificationStyle} />
            <div>{user.name} logged in</div>
            <button onClick={handleLogout}>logout</button>
            <br/><br/>

            <Togglable buttonLabel="create new" ref={blogFormRef}>
                <BlogForm createBlog={addBlog} user={user} />
            </Togglable>

            <br/><br/>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
            )}
        </div>
    )
}

export default App