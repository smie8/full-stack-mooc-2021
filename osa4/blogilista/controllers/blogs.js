const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    if (blogs) {
      response.json(blogs)
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const body = request.body
  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user,
  })

  try {
    if (!blog.likes) {
      blog.likes = 0
    }

    if (!blog.title && !blog.author) {
      return response.status(400).json({ error: 'Bad request' })
    }

    const savedBlog = await blog.save()
    
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const user = request.user

    if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'Token invalid or user trying to delete somebody elses blog' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const updatedBlog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
      user: request.body.user,
      id: request.body.id
    }
    await Blog.findByIdAndUpdate(request.params.id, { likes: request.body.likes })
    response.json(updatedBlog)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter