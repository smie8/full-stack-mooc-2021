import axios from 'axios'

const baseUrl = '/api/blogs/'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async newObject => {
  const config = { headers: { Authorization: token } }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBlog = async (id, newObject) => {
  const config = { headers: { Authorization: token } }

  const response = await axios.put(`${ baseUrl }/${ id }`, newObject, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = { headers: { Authorization: token } }

  const response = await axios.delete(`${ baseUrl }/${ id }`, config)
  return response.data
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default { setToken, getAllBlogs, createBlog, updateBlog, deleteBlog }