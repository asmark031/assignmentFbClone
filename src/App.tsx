import { Router } from '@reach/router';
import React from 'react';
import Home from './Home';
import Post from './Post';

export default function App() {

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <Router>
        <Home path="/"></Home>
        <Post path="post/:userId"></Post>
      </Router>
    </div>
  );
}
