import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        appendBlogs(state, action) {
            state.push(action.payload)
        },
        addLike(state, action) {
            const id = action.payload
            const blogToChange = state.find(blog => blog.id === id)
            const changedBlog = {
                ...blogToChange,
                likes: blogToChange.likes + 1
            }
            return state.map(blog =>
                blog.id !== id ? blog : changedBlog
            )
        },
        removeBlog(state, action) {
            const id = action.payload
            return state.filter(blog => blog.id !== id)
        },
        updateBlog(state, action) {
            const updatedBlog = action.payload
            return state.map(blog =>
                blog.id !== updatedBlog.id ? blog : updatedBlog
            )
        }
    }
})

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = content => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch(appendBlogs(newBlog))
    }
}

export const updateLikes = id => {
    return async dispatch => {
        const oldBlog = await blogService.getSingleBlog(id)
        const newBlog = {
            ...oldBlog,
            likes: oldBlog.likes + 1
        }
        await blogService.updateBlog(newBlog)
        dispatch(addLike(newBlog.id))
    }
}

export const editBlog = blogObject => {
    return async dispatch => {
        await blogService.updateBlog(blogObject)
        dispatch(updateBlog(blogObject))
    }
}

export const appendComment = (blogObject, comment) => {
    return async dispatch => {
        const oldBlog = await blogService.getSingleBlog(blogObject.id)
        oldBlog.comments.push(comment)
        console.log(oldBlog)

        await blogService.addComment(oldBlog, comment)
        dispatch(updateBlog(oldBlog))
    }
}

export const deleteBlog = id => {
    return async dispatch => {
        const blogToDelete = await blogService.getSingleBlog(id)
        await blogService.deleteBlog(blogToDelete)
        dispatch(removeBlog(id))
    }
}



export const { setBlogs, appendBlogs, addLike, removeBlog, updateBlog } = blogSlice.actions
export default blogSlice.reducer