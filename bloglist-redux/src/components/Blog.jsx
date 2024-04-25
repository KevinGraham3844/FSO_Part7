/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import EditForm from "../components/EditForm";
import { updateLikes } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'

const Blog = ({ blog, user }) => {
    const [visible, setVisible] = useState(false);
    const [removeVisible, setRemoveVisible] = useState(true);

    const dispatch = useDispatch()

    useEffect(() => {
        console.log(blog.user.id);
        console.log(user.id);
        if (user.id !== blog.user.id) {
            setRemoveVisible(false);
        }
        if (blog.user === user.id) {
            setRemoveVisible(true);
        }
    }, []);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };
    const removeVisibility = { display: removeVisible ? "" : "none" };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };

    return (
        <div className="singleBlog">
            <div style={blogStyle}>
                <div
                    data-testid="blog-header"
                    style={hideWhenVisible}
                    className="seenBlog"
                >
                    <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                </div>
                <div style={showWhenVisible} className="hiddenBlog">
                    <div>
                        {blog.title}
                        <button onClick={toggleVisibility}>hide</button>
                        <div style={removeVisibility}>
                            <EditForm blog={blog} textType={"title"} />
                        </div>
                    </div>
                    <div>
                        {blog.url}
                        <div style={removeVisibility}>
                            <EditForm blog={blog} textType={"url"} />
                        </div>
                    </div>
                    <div>
            likes {blog.likes}
                        <button onClick={() => dispatch(updateLikes(blog.id))}>like</button>
                    </div>
                    <div>
                        {blog.author}
                        <div style={removeVisibility}>
                            <EditForm blog={blog} textType={"author"} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Blog;
