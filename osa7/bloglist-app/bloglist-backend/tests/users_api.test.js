const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('when there is initially one user at database', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('salaisuus', 10)
        const user = new User({
            username: 'root',
            passwordHash
        })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'testuser',
            name: "Test User",
            password: 'salaisuus',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username is already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: "Tester Number Two",
            password: "salaisuus",
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if username has less than 3 chars', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'na',
            name: 'Test User With Short Username',
            password: 'salaista'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
            expect(result.body.error).toContain('Username and password must have at least 3 characters')
            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if password has less than 3 chars', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'userWithShortPassword',
            name: 'Test User With Short Password',
            password: 'na'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        
            expect(result.body.error).toContain('Username and password must have at least 3 characters')
            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})