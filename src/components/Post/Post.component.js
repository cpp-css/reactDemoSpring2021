import { useState } from "react";

import PostModal from '../PostModal/PostModal.component';

import "../Post/Post.styles.css";

const Post = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = (event) => {
        event.preventDefault();
        if (event.target === event.currentTarget) {
            setIsModalOpen(!isModalOpen);
        }
    }

    return(
        <div className="post_wrapper" key={props.postId}>
            <div className="post_container"  style={{marginBottom: "1rem"}} onClick={() => {setIsModalOpen(true)}}>
                <div className="post_title"> {props.title} </div>
                <div className="post_body"> {props.body} </div>
            </div>
            {isModalOpen && <PostModal data={props} toggleModal={toggleModal}/>}
        </div>
    )
}

export default Post;