import { useState, useEffect } from 'react';
import axios from "axios";

import './App.css';

import Post from "./components/Post/Post.component";
import Comment from "./components/Comment/Comment.component";
import CommentInput from "./components/CommentInput/CommentInput.component";

const userId = 4;
const postId = 1;
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

function App() {

    const [post, setPost] = useState({});
    const [user, setUser] = useState([]);
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
        axios.all([
            axios.get(`/users/${userId}`),
            axios.get(`/posts/${postId}`)
        ])
        .then(axios.spread((user, post) => {
            document.title = user.data.name + "'s Blog"
            setPost(post.data);
            setUser(user.data);
        }))
        .catch(error => {
            console.log(error);
        })

        axios.get(`/comments?postId=${postId}`)
        .then(response => {
            setComments(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <div className="App container">
            <h1 className="user_name"> {user.name}'s Blog </h1>
            <Post title={post.title} body={post.body} userId={post.userId} postId={post.id}/>
            <div className="comment_header"> Comments </div>
            <CommentInput entry={newComment} onChange={handleOnChange} onSubmit={onSubmit}/>
            {comments.map(data => {
                return <Comment key={data.id} id={data.id} name={data.name} email={data.email} body={data.body}/>
            })}
        </div>
    );
}

export default App;