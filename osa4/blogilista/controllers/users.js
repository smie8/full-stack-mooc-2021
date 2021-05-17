const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
    try {
      const users = await User.find({})
      if (users) {
        response.json(users)
      }
    } catch(exception) {
      next(exception)
    }
  })

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (!body.username || !body.password) {
        return response.status(400).json({ error: 'Bad request: username and password needed' })
    }

    if (body.username.length < 3 || body.password.length < 3) {
        return response.status(400).json({ error: 'Username and password must have at least 3 characters'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    try {
        const savedUser = await user.save()
        response.json(savedUser)
    } catch(exception) {
        next(exception)
    }
})

module.exports = usersRouter