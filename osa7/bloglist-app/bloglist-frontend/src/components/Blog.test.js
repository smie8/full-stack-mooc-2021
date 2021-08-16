import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders title and author', () => {
    const blog = {
        title: 'title for test blog',
        author: 'author for test blog',
        user: [{ username: 'testuser' }]
    }
    const user = { username: 'testuser' }

    const component = render(
        <Blog blog={blog} user={user} />
    )

    const blogDOM = component.container.querySelector('.blogDiv')
    console.log(prettyDOM(blogDOM))

    expect(component.container).toHaveTextContent('title for test blog')
    expect(component.container).toHaveTextContent('author for test blog')
})

test('url and likes are displayed when user has clicked blog details', async () => {
    const blog = {
        title: 'title for test blog',
        author: 'author for test blog',
        likes: 1,
        url: 'testurl.com',
        user: [{ username: 'testuser' }]
    }
    const user = { username: 'testuser' }

    const component = render(
        <Blog blog={blog} user={user} />
    )

    const button = component.container.querySelector('span')
    const blogDetails = component.container.querySelector('.blogDetails')
    expect(blogDetails).toHaveStyle('display: none')
    fireEvent.click(button)

    expect(blogDetails).toHaveStyle('display: block')
    expect(blogDetails).toHaveTextContent('url:')
    expect(blogDetails).toHaveTextContent('testurl.com')
    expect(blogDetails).toHaveTextContent('likes:')
    expect(blogDetails).toHaveTextContent('1')
})

test('handleLike is called two times when clicked like button two times', () => {
    const likeBlog = jest.fn()

    const blog = {
        title: 'title for test blog',
        author: 'author for test blog',
        likes: 1,
        url: 'testurl.com',
        user: [{ username: 'testuser' }]
    }
    const user = { username: 'testuser' }

    const component = render(
        <Blog blog={blog} user={user} likeBlog={likeBlog} />
    )

    const button = component.container.querySelector('button')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(likeBlog.mock.calls).toHaveLength(2)
})

test('<BlogForm /> calls callback function with valid data when blog is created', () => {
    const createBlog = jest.fn()

    const component = render(
        <BlogForm createBlog={createBlog} />
    )

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
        target: { value: 'Testing Blog' }
    })

    fireEvent.change(author, {
        target: { value: 'Ada Lovelace' }
    })

    fireEvent.change(url, {
        target: { value: 'url.com' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    console.log(createBlog.mock.calls)
    expect(createBlog.mock.calls[0][0].title).toBe('Testing Blog')
    expect(createBlog.mock.calls[0][0].author).toBe('Ada Lovelace')
    expect(createBlog.mock.calls[0][0].url).toBe('url.com')
})