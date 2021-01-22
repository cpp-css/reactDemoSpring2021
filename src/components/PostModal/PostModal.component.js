import { useState, useEffect } from "react";
import axios from "axios";

import "./PostModal.styles.css";

import Comment from '../Comment/Comment.component';
import CommentInput from '../CommentInput/CommentInput.component';

const PostModal = (props) => {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({});

    const handleOnChange = (event) => {
        setNewComment({...newComment, [event.target.name]: event.target.value});
    }
    
    const onSubmit = () => {
        setComments([...comments, newComment]);
        setNewComment({
            email: "",
            name: "",
            body: ""
        });
    }

    useEffect(() => {
        axios.get(`/comments?postId=${props.data.postId}`)
        .then(response => {
            setComments(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }, [props.data.postId])
    // Leaving the second argument blank will run useEffect once. : componentDidMount
    // Having an element within the array will re-render the DOM whenever it detects a change. : componentDidUpdate

    return (
        <div className="postModal_wrapper" onClick={props.toggleModal}>
            <div className="postModal_container">
                <div className="postModal_title"> {props.data.title} </div>
                <div className="post_body"> {props.data.body} </div>
                <div className="postModal_comment_container">
                    <div className="comment_header"> Comments </div>
                    <CommentInput entry={newComment}  onChange={handleOnChange} onSubmit={onSubmit}/>
                    {comments.map(data => {
                        return <Comment key={data.id} id={data.id} name={data.name} email={data.email} body={data.body}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default PostModal;