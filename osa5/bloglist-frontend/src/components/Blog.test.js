import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

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