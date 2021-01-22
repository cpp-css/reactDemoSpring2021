import "../Post/Post.styles.css";

const Post = (props) => {
    return(
        <div className="post_wrapper" key={props.postId}>
            <div className="post_container"  style={{marginBottom: "1rem"}}>
                <div className="post_title"> {props.title} </div>
                <div className="post_body"> {props.body} </div>
            </div>
        </div>
    )
}

export default Post;