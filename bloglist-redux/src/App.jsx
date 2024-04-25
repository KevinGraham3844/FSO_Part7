/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { BrowserRouter as Router,
    Routes, Route, Link
} from 'react-router-dom'
import "./index.css";
import { Container, Button } from '@mui/material/'
import Blogs from "./components/Blogs"
import ErrorNotification from "./components/ErrorNotification";
import CreateNotification from "./components/CreateNotification";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users"
import SingleUser from "./components/SingleUser";
import SingleBlog from "./components/SingleBlog"
import blogService from "./services/blogs"

import { useDispatch, useSelector } from 'react-redux'
import { setCreatedNotification } from './reducers/createNotificationReducer'
import { initializeBlogs } from "./reducers/blogsReducer";
import { createBlog } from "./reducers/blogsReducer";
import { loginUser, retainUser, logoutUser } from './reducers/userReducer'

const App = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const blogs = [...useSelector(state => state.blogs)].sort((a, b) => a.likes - b.likes)
    const errorMessage = useSelector(state => state.errorNotification)
    const createdMessage = useSelector(state => state.createNotification)
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)


    const dispatch = useDispatch()
    const padding = { padding: 5 }

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch]);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(retainUser(user))
            blogService.setToken(user.token)
        }
    }, []);

    const addBlog = async (blogObject) => {
        dispatch(createBlog(blogObject))
        dispatch(setCreatedNotification(`a new blog ${blogObject.title} by ${blogObject.author} added!`))
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log("logging in with", username, password);
        dispatch(loginUser(username, password))
    };

    if (user === null) {
        return (
            <div>
                <h1>log in to application</h1>
                <ErrorNotification message={errorMessage} />
                <LoginForm
                    username={username}
                    password={password}
                    handleLogin={handleLogin}
                    setUserFunc={({ target }) => setUsername(target.value)}
                    setPassFunc={({ target }) => setPassword(target.value)}
                />
            </div>
        );
    }

    return (
        <Container>
            <div>
                <CreateNotification message={createdMessage} />
                <Router>
                    <div className="navbar">
                        <Link style={padding} to="/users">users</Link>
                        <Link style={padding} to="/blogs">blogs</Link>
                        {user.name} logged in
                        <Button
                            variant="contained"
                            size= "small"
                            onClick={() => dispatch(logoutUser())}
                        >logout
                        </Button>
                    </div>
                    <h2>blog app</h2>
                    <Routes>
                        <Route />
                        <Route path="/users/*" element={<Users />}/>
                        <Route path="/blogs" element={<Blogs addblog={addBlog} user={user}/>}/>
                        <Route path="/users/:id" element={<SingleUser users={users} />} />
                        <Route path="/blogs/:id" element={<SingleBlog blogs={blogs} user={user} />} />
                    </Routes>
                </Router>
            </div>
        </Container>
    );
};

export default App;

