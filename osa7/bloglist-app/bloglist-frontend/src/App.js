import React, { useState, useEffect } from 'react'
import { createStore } from 'redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [notification, setNotification] = useState(null)

	const blogFormRef = React.createRef()

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
		const user = storage.loadUser()
		setUser(user)
	}, [])

	const notificationReducer = (state = '', action) => {
		switch (action.type) {
            case 'SET':
                state = action.data
                return state
                // setTimeout(() => {
                //     return action.content
                // }, 5000)
            default:
                return state
        }
	}

	const store = createStore(notificationReducer)

    store.subscribe(() => {
        const storeNow = store.getState()
        console.log('store has changed: ', storeNow)
    })

	const notifyWith = (message, type='success') => {
		setNotification({
			message, type
		})
		setTimeout(() => {
			setNotification(null)
		}, 5000)
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username, password
			})

			setUsername('')
			setPassword('')
			setUser(user)
			notifyWith(`${user.name} welcome back!`)
			storage.saveUser(user)
		} catch(exception) {
			notifyWith('wrong username/password', 'error')
		}
	}

	const createBlog = async (blog) => {
		try {
			const newBlog = await blogService.create(blog)
			blogFormRef.current.toggleVisibility()
			setBlogs(blogs.concat(newBlog))
			notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
		} catch(exception) {
			console.log(exception)
		}
	}

	const handleLike = async (id) => {
        // TODO: remove
        console.log('state before:', store.getState())
        store.dispatch({ type: 'SET', data: 'like has changed the state'})
        console.log('state after:', store.getState())

		const blogToLike = blogs.find(b => b.id === id)
		const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
		await blogService.update(likedBlog)
		setBlogs(blogs.map(b => b.id === id ?	{ ...blogToLike, likes: blogToLike.likes + 1 } : b))
	}

	const handleRemove = async (id) => {
		const blogToRemove = blogs.find(b => b.id === id)
		const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
		if (ok) {
			await blogService.remove(id)
			setBlogs(blogs.filter(b => b.id !== id))
		}
	}

	const handleLogout = () => {
		setUser(null)
		storage.logoutUser()
	}

	if ( !user ) {
		return (
			<div>
				<h2>login to application</h2>

				<Notification notification={notification} />

				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							id='username'
							value={username}
							onChange={({ target }) => setUsername(target.value)}
						/>
					</div>
					<div>
						password
						<input
							id='password'
							type='password'
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button id='login'>login</button>
				</form>
			</div>
		)
	}

	const byLikes = (b1, b2) => b2.likes - b1.likes

	return (
		<div>
			<h2>blogs</h2>

			<Notification notification={notification} />

			<p>
				{user.name} logged in <button onClick={handleLogout}>logout</button>
			</p>

			<Togglable buttonLabel='create new blog'	ref={blogFormRef}>
				<NewBlog createBlog={createBlog} />
			</Togglable>

			{blogs.sort(byLikes).map(blog =>
				<Blog
					key={blog.id}
					blog={blog}
					handleLike={handleLike}
					handleRemove={handleRemove}
					own={user.username===blog.user[0].username}
				/>
			)}
		</div>
	)
}

export default App