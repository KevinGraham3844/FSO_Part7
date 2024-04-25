
const CommentList = ({ comments }) => {

    if (comments.length === 0) {
        return null
    }
    return (
        <div>
            <ul>
                {comments.map(comment => (
                    <li key={Math.floor(Math.random() * 100000)}>{comment}</li>
                ))}
            </ul>
        </div>
    )
}

export default CommentList