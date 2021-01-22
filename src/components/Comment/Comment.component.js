import './Comment.styles.css';

const Comment = (props) => {
    return(
        <div className="comment_container" key={props.id} style={{marginBottom: "1rem"}}>
            <div className="comment_email"> {props.email} </div>
            <div className="comment_name"> {props.name} </div>
            <div className="comment_body"> {props.body}</div>
        </div>
    )
}

export default Comment;
