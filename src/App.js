import { useState, useEffect } from 'react';
import axios from "axios";

import './App.css';

import Post from "./components/Post/Post.component";

const userId = 4;
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

function App() {

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);

    const populateBlog = posts.map(data => {
        return <Post key={data.id} title={data.title} body={data.body} userId={data.userId} postId={data.id}/>
    })

    useEffect(() => {
        axios.all([
            axios.get(`/users/${userId}`),
            axios.get(`/users/${userId}/posts`)
        ])
        .then(axios.spread((user, posts) => {
            document.title = user.data.name + "'s Blog"
            setPosts(posts.data);
            setUser(user.data);
        }))
        .catch(error => {
            console.log(error);
        })
    }, [])
    // Leaving the second argument blank will run useEffect once.

    return (
        <div className="App container">
            <h1 className="user_name"> {user.name}'s Blog </h1>
            {populateBlog}
        </div>
    );
}

export default App;
