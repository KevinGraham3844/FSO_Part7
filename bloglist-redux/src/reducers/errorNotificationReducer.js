import { createSlice } from '@reduxjs/toolkit'

const errorNotificationSlice = createSlice({
    name: 'errorNotification',
    initialState: null,
    reducers: {
        notifyOnError(state, action) {
            return action.payload
        }
    }
})

export const setErrorNotification = (notification) => {
    return dispatch => {
        dispatch(notifyOnError(notification))
        setTimeout(() => {
            dispatch(notifyOnError(null))
        }, 5000)
    }
}

export const { notifyOnError } = errorNotificationSlice.actions
export default errorNotificationSlice.reducer