const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Test blog',
        author: 'Tester',
        url: 'www.testblogurl.com',
        likes: 0
    },
    {
        title: 'Test blog 2',
        author: "Another tester",
        url: 'www.testblogurl2.com',
        likes: 2
    }
]

// const nonExistingId = async () => {
//   const note = new Note({ content: 'willremovethissoon', date: new Date() })
//   await note.save()
//   await note.remove()

//   return note._id.toString()
// }

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, usersInDb
}