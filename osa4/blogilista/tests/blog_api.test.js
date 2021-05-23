const { request } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const initialBlogs = helper.initialBlogs
const testUsername = "root"
const testPassword = "salaisuus"
let token = 'secret'

beforeAll(async (done) => {
    await api
        .post('/api/login')
        .send({
            username: testUsername,
            password: testPassword
        })
        .end((err, response) => {
            token = response.body.token
            done()
        })
})

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

describe('getting initial blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')
      
        expect(response.body).toHaveLength(2)
    })
    
    test('returned blog object has a field called "id"', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body[0].id).toBeDefined()
    })
})

describe('addition of a new blog', () => {
    test('new blog is added to blogs', async () => {
        const newBlog = { 
            title: "New blog", 
            author: "Tester",
            url: "testing.com",
            likes: 0
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const getAllBlogsResponse = await api.get('/api/blogs')
    
        const titles = getAllBlogsResponse.body.map(r => r.title)
    
        expect(getAllBlogsResponse.body).toHaveLength(initialBlogs.length + 1)
        expect(titles).toContain(
            'New blog'
        )
    })
    
    test('new blog with no likes-parameter will initialized with 0 likes', async () => {
        const newBlog = {
            title: "New blog with no likes",
            author: "Tester",
            url: "url.com"
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const getAllBlogsResponse = await api.get('/api/blogs')
    
        const getNewBlogResponse = getAllBlogsResponse.body.find(blog => blog.title === "New blog with no likes")
        expect(getNewBlogResponse.likes).toBe(0)
    
    })
    
    test('new blog with no title and url will be 400 Bad request', async () => {
        const newBlog = {
            likes: 0,
            url: "url.com"
        }
    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })

    test('new blog with no token can not be created', async () => {
        const newBlog = {
            title: "New blog",
            author: "Tester",
            likes: 0,
            url: "url.com"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})

describe('deletion of a blog', () => {
    test('delete blog', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogToDelete = blogsAtStart.body[0]
        
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
    
        const blogsAtEnd = await api.get('/api/blogs')
        const titles = blogsAtEnd.body.map(r => r.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('editing a blog', () => {
    test('update likes from 0 to 10', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogToUpdate = blogsAtStart.body[0]
        expect(blogToUpdate.likes).toBe(0)

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ likes: 10 })
            .expect(303)

        const blogsAtEnd = await api.get('/api/blogs')
        const updatedBlog = blogsAtEnd.body.find(blog => blog.id === blogToUpdate.id)
        expect(updatedBlog.likes).toBe(10)
    })
})

afterAll(() => {
    mongoose.connection.close()
})