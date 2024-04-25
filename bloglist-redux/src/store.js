import { configureStore } from "@reduxjs/toolkit";
import createNotificationReducer from './reducers/createNotificationReducer'
import errorNotificationReducer from "./reducers/errorNotificationReducer";
import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";
import usersReducer from "./reducers/usersReducer";

const store = configureStore({
    reducer: {
        createNotification: createNotificationReducer,
        errorNotification: errorNotificationReducer,
        blogs: blogsReducer,
        user: userReducer,
        users: usersReducer
    }
});

export default store;
