import { useSelector } from 'react-redux'
import { useRef } from "react"
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const Blogs = ({ addblog, user }) => {
    const blogs = [...useSelector(state => state.blogs)].sort((a, b) => a.likes - b.likes)

    const blogFormRef = useRef()

    const toggleVisibility = () => {
        blogFormRef.current.toggleVisibility();
    }

    return (
        <div>
            <div>
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                    <BlogForm toggleVisibility={toggleVisibility} createBlog={addblog} inputId={user.id} />
                </Togglable>
            </div>
            <div>
                {blogs.map(blog => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        user={user}
                    />
                ))}
            </div>
        </div>

    )
}

export default Blogs