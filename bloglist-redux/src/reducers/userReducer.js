import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setErrorNotification } from './errorNotificationReducer'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        }
    }
})

export const loginUser = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
                username,
                password
            })

            window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
            blogService.setToken(user.token)
            dispatch(setUser(user))
        } catch (exception) {
            dispatch(setErrorNotification("Wrong username or password"))
        }
    }
}

export const retainUser = user => {
    return dispatch => {
        dispatch(setUser(user))
    }
}

export const logoutUser = () => {
    return dispatch => {
        window.localStorage.clear();
        dispatch(setUser(null))
    }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer