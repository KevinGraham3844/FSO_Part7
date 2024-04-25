import { useState } from "react"
import { useParams } from  'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateLikes, appendComment } from '../reducers/blogsReducer'
import CommentList from "./CommentList"

const SingleBlog = ({ blogs, user }) => {

    const [newText, setText] = useState("")
    const id = useParams().id
    const blog = blogs.find(blog => blog.id === id)
    const dispatch = useDispatch()

    const updateComments = (event) => {
        event.preventDefault()
        dispatch(appendComment(blog, newText))
        setText('')
    }

    if (!user || !blog) {
        return null
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <div>
                <a href={`https://${blog.url}`}>{blog.url}</a>
                <div>
                    {blog.likes} likes <button onClick={() => dispatch(updateLikes(blog.id))}>like</button>
                </div>
                <div>
                    added by {blog.author}
                </div>
                <form onSubmit={updateComments}>
                    <div>
                        <input
                            value={newText}
                            onChange={(event) => setText(event.target.value)}
                        />
                        <button type="submit">add comment</button>
                    </div>
                </form>
            </div>
            <h3>comments</h3>
            <CommentList comments={blog.comments} />
        </div>
    )
}

export default SingleBlog