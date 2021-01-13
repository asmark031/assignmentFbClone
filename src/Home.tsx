import { Button } from '@material-ui/core';
import { navigate, RouteComponentProps } from '@reach/router';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserModel from './UserModel';

export default function Home(props: RouteComponentProps) {
    const [users, setUsers] = useState([]);

    async function getUsers() {
        let usersFromAPI = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(usersFromAPI.data);
    }


    useEffect(() => {
        getUsers()
    }, [])

    return (

        <div>
            <div style={{ height: "24px" }}></div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontSize: "24px" }}>Users</div>
                <div><Button onClick={() => getUsers()}>Reload</Button></div>
            </div>

            <div style={{ height: "24px" }}></div>

            <div>
                {users.map((user: UserModel) => <UserInfo key={user.id} user={user}></UserInfo>)}
            </div>
        </div>

    );
}


function UserInfo(props: { user: UserModel }) {

    return (
        <div style={{ display: "flex", flexDirection: "column", cursor: "pointer", marginBottom: "20px", border: "1px solid black", padding: "24px", borderRadius: "8px" }} onClick={() => { navigate(`/post/${props.user.id}`) }}>
            <div> User Name : {props.user.username} </div>
            <div> Name : {props.user.name} </div>
            <div> Email : {props.user.email} </div>
            <div> Phone : {props.user.phone} </div>
            <div> Website : {props.user.website} </div>
        </div>
    );
}
