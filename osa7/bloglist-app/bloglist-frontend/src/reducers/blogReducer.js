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
    case 'LIKE_BLOG': {
        const id = action.data.id
        let likedBlog = state.find(blog => blog.id === id)
        likedBlog.likes += 1
        return state.map((blog) => (blog.id === id ? likedBlog : blog))
    }
    case 'COMMENT_BLOG': {
        const id = action.data.id
        const comment = action.data.commentObj.comment
        let commentedBlog = state.find(blog => blog.id === id)
        commentedBlog.comments = commentedBlog.comments.concat(comment)
        return state.map((blog) => (blog.id === id ? commentedBlog : blog))
    }
    case 'DELETE_BLOG': {
        return state.filter((blog) => (blog.id !== action.data.id))
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

export const likeBlog = (id, blog) => {
    return async dispatch => {
        const likedBlog = await blogService.updateBlog(id, blog)
        dispatch({
            type: 'LIKE_BLOG',
            data: { likedBlog, id }
        })
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch({
            type: 'DELETE_BLOG',
            data: { id }
        })
    }
}

export const commentBlog = (id, commentObj) => {
    return async dispatch => {
        await blogService.createComment(id, commentObj)
        dispatch({
            type: 'COMMENT_BLOG',
            data: { id, commentObj }
        })
    }
}

