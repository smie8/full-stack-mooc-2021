const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = request.token

  try {
    // const decodedToken = jwt.verify(token, process.env.SECRET)
    // if (!token || !decodedToken.id) {
    //   return response.status(401).json({ error: 'token missing or invalid' })
    // }
    // const user = await User.findById(decodedToken.id)
    const user = request.user
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user,
    })

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

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const blog = await Blog.findById(request.params.id)
    // const user = await User.findById(decodedToken.id)
    const user = request.user

    // if (!token || !decodedToken.id) {
    //   return response.status(401).json({ error: 'token missing or invalid' })
    // }

    if (blog.user.toString() !== user.id.toString()) {
      return response.status(401).json({ error: 'Token invalid or user trying to delete somebody elses blog' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndUpdate(request.params.id, { likes: request.body.likes })
    response.status(303).end()
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter