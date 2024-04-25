import { useState } from "react";
import { useDispatch } from "react-redux";
import { editBlog } from "../reducers/blogsReducer";

const EditForm = ({ blog, textType }) => {
    const [newText, setText] = useState("");
    const [editVisibility, setEditVisibility] = useState(false);

    const showEdit = { display: editVisibility ? "" : "none" };

    const dispatch = useDispatch()

    const toggleEdit = (event) => {
        event.preventDefault();
        setEditVisibility(!editVisibility);
    };

    const updateBlog = () => {
        const updatedBlogObject = {
            ...blog,
            author: textType === "author" ? newText : blog.author,
            title: textType === "title" ? newText : blog.title,
            url: textType === "url" ? newText : blog.url,
        }
        dispatch(editBlog(updatedBlogObject));
    };

    return (
        <div>
            <button onClick={toggleEdit}>edit</button>
            <div style={showEdit}>
                <form onSubmit={updateBlog}>
                    <div>
                        <input
                            data-testid="editbox"
                            value={newText}
                            onChange={(event) => setText(event.target.value)}
                        />
                    </div>
                    <button type="submit">update</button>
                    <button onClick={toggleEdit}>cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditForm;
