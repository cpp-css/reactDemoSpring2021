import { useState, useEffect } from 'react';
import axios from "axios";

import './App.css';

import Post from "./components/Post/Post.component";
import Comment from "./components/Comment/Comment.component";
import CommentInput from "./components/CommentInput/CommentInput.component";

const postId = 100;
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
        axios.post(`posts/${postId}/comments`, newComment)
        .then(response => {
            setComments([...comments, response.data]);
        })

        setNewComment({
            email: "",
            name: "",
            body: ""
        });
    }

    async function fetchPost(postId) {
        try {
            const response = await axios.get(`/posts/${postId}`);
            setPost(response.data);
        } catch(error) {
            console.error(error);
        }
    }

    async function fetchComments(postId) {
        try {
            const response = await axios.get(`/posts/${postId}/comments`);
            setComments(response.data);
        } catch(error) {
            console.error(error);
        }
    }

    async function fetchUser(userId) {
        try {
            const response = await axios.get(`/users/${userId}`);
            setUser(response.data);
        } catch(error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchPost(postId);
        fetchComments(postId);
        fetchUser(post.userId);
        document.title = user.name + "'s Blog";
    }, [post.userId, user.name])

    return (
        <div className="App container">
            <h1 className="user_name"> {user.name}'s Blog </h1>
            <Post title={post.title} body={post.body} userId={post.userId} postId={post.id}/>
            <div className="comment_header"> Comments </div>
            {comments.map(data => {
                return <Comment key={data.id} id={data.id} name={data.name} email={data.email} body={data.body}/>
            })}
            <CommentInput entry={newComment} onChange={handleOnChange} onSubmit={onSubmit}/>
        </div>
    );
}

export default App;