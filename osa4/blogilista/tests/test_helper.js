const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Test blog',
        author: 'Tester',
        url: 'www.testblogurl.com',
        likes: 0,
        user: [{
            _id: "60a93243894f393ee0e85110"
        }]
    },
    {
        title: 'Test blog 2',
        author: "Another tester",
        url: 'www.testblogurl2.com',
        likes: 2,
        user: [{
            _id: "60a93243894f393ee0e85110"
        }]
    }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, usersInDb
}