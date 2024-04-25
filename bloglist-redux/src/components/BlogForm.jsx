import { useState } from "react";
import * as Mui from '@mui/material/'

const BlogForm = ({ createBlog, inputId, toggleVisibility }) => {
    const [newAuthor, setAuthor] = useState("");
    const [newTitle, setTitle] = useState("");
    const [newUrl, setUrl] = useState("");

    const addBlog = (event) => {
        event.preventDefault();
        toggleVisibility()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            id: inputId,
        });

        setAuthor("");
        setTitle("");
        setUrl("");
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    <Mui.TextField
                        label="title"
                        size="small"
                        data-testid="title"
                        value={newTitle}
                        onChange={(event) => setTitle(event.target.value)}
                        id="title-input"
                    />
                </div>
                <div>
                    <Mui.TextField
                        label="author"
                        size="small"
                        data-testid="author"
                        value={newAuthor}
                        onChange={(event) => setAuthor(event.target.value)}
                        id="author-input"
                    />
                </div>
                <div>
                    <Mui.TextField
                        label="url"
                        size="small"
                        data-testid="url"
                        value={newUrl}
                        onChange={(event) => setUrl(event.target.value)}
                        id="url-input"
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default BlogForm;
