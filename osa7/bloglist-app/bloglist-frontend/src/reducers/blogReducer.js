import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT_BLOGS': {
        const blogs = action.data.blogs
        return blogs.sort((a, b) => { return b.likes - a.likes })
    }
    case 'CREATE_BLOG': {
        return [...state, action.data.newBlog]
    }
    default:
        return state
    }
}

export default blogReducer

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAllBlogs()
        dispatch({
            type: 'INIT_BLOGS',
            data: { blogs }
        })
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.createBlog(blog)
        dispatch({
            type: 'CREATE_BLOG',
            data: { newBlog }
        })
    }
}

