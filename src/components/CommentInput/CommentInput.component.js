import "./CommentInput.styles.css";

const CommentInput = (props) => {
    return (
        <form className="commentInput_container">
            <div>
                <div className="commentInput_label commentInput_input"> Email </div>
                <input className="commentInput_email" name="email" placeholder="jdoe@cpp.edu" type="email" value={props.entry.email} onChange={event => props.onChange(event)}/>
            </div>
            <div>
                <div className="commentInput_label commentInput_input"> Title </div>
                <input className="commentInput_title" name="name" placeholder="An interesting title" type="email" value={props.entry.name} onChange={event => props.onChange(event)}/>
            </div>
            <div>
                <div className="commentInput_label commentInput_input"> Body </div>
                <textarea className="commentInput_body" name="body" placeholder="Add a public comment..." value={props.entry.body} onChange={event => props.onChange(event)}/>
                <button type="button" onClick={props.onSubmit}> Add </button>
            </div>
        </form>
    )
}

export default CommentInput;