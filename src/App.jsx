import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UsersSidebar from './components/UsersSidebar';
import PostsArea from './components/PostsArea';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
  const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [usersRes, postsRes] = await Promise.all([
          fetch(USERS_URL),
          fetch(POSTS_URL)
        ]);
        
        if (!usersRes.ok) throw new Error('Ошибка загрузки пользователей');
        if (!postsRes.ok) throw new Error('Ошибка загрузки постов');
        
        const usersData = await usersRes.json();
        const postsData = await postsRes.json();
        
        setUsers(usersData);
        setPosts(postsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleSelectUser = (userId) => {
    setCurrentUserId(userId);
  };

  const getSelectedUser = () => {
    return users.find(user => user.id === currentUserId);
  };

  const filteredPosts = currentUserId 
    ? posts.filter(post => post.userId === currentUserId)
    : [];

  return (
    <div className="app-container">
      <Header />
      <div className="layout">
        <UsersSidebar
          users={users}
          currentUserId={currentUserId}
          onSelectUser={handleSelectUser}
          loading={loading}
          error={error}
        />
        <PostsArea
          posts={filteredPosts}
          selectedUser={getSelectedUser()}
          loading={loading}
          hasUsers={users.length > 0}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;