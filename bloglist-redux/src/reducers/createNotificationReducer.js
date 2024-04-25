import { createSlice } from "@reduxjs/toolkit";

const createNotificationSlice = createSlice({
    name: "createNotification",
    initialState: null,
    reducers: {
        notifyOnCreatedBlog(state, action) {
            return action.payload;
        },
    },
});

export const setCreatedNotification = (notification) => {
    return (dispatch) => {
        dispatch(notifyOnCreatedBlog(notification));
        setTimeout(() => {
            dispatch(notifyOnCreatedBlog(null));
        }, 5000);
    };
};

export const { notifyOnCreatedBlog } = createNotificationSlice.actions;
export default createNotificationSlice.reducer;
