import { Button, TextField } from '@material-ui/core';
import { navigate, RouteComponentProps } from '@reach/router';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostModel from './PostModel';

export default function Post(props: RouteComponentProps<{ userId: number }>) {

    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    async function getPosts() {
        let postsFromAPI = await axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${props.userId}`);
        setPosts(postsFromAPI.data);
        setFilteredPosts(postsFromAPI.data);
    }

    useEffect(() => {
        getPosts()
    }, [])


    function search(query: string) {
        var filteredResults = posts.filter((post: PostModel) => {
            if (post.title.includes(query))
                return post
        })
        setFilteredPosts(filteredResults);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>

            <div style={{ display: "flex", justifyContent: "space-between", margin: "24px 0" }}>
                <div style={{ fontSize: "24px" }}>Post</div>

                <TextField size="small" label="search" variant="outlined" onChange={(val) => search(val.target.value)} />

                <div style={{ display: "flex" }}>
                    <div><Button variant="outlined" onClick={() => getPosts()}>Reload</Button></div>
                    <div style={{ width: "24px" }}></div>
                    <div><Button variant="outlined" onClick={() => navigate('/')}>Back</Button></div>
                </div>
            </div>

            <div style={{ flex: "1", overflow: "auto" }}>
                {filteredPosts.map((post: PostModel) => <PostInfo key={post.id} post={post}></PostInfo>)}
            </div>

        </div>
    )
}

function PostInfo(props: { post: PostModel }) {
    return (
        <div style={{ marginBottom: "20px", border: "1px solid black", padding: "24px", borderRadius: "8px" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>{props.post.title}</div>
            <div>{props.post.body}</div>
        </div>
    )
}