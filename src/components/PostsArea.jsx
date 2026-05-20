import React, { useState } from 'react';
import './PostsArea.css';

const PostsArea = ({ posts, selectedUser, loading, hasUsers }) => {
  const [expandedPosts, setExpandedPosts] = useState({});

  const togglePost = (postId) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const getPostText = (text, isExpanded, maxLength = 120) => {
    if (isExpanded) return text;
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const shouldShowButton = (text, maxLength = 120) => {
    return text.length > maxLength;
  };

  if (loading) {
    return (
      <div className="posts-area">
        <div className="posts-header">
          <h3>Посты</h3>
        </div>
        <div className="loading-posts">
          <div className="spinner"></div>
          <p>Загрузка постов...</p>
        </div>
      </div>
    );
  }

  if (!hasUsers) {
    return (
      <div className="posts-area">
        <div className="posts-header">
          <h3>Посты</h3>
        </div>
        <div className="empty-state">
          <div className="empty-icon">🔌</div>
          <h4>Нет подключения</h4>
          <p>Не удалось загрузить данные. Проверьте интернет-соединение.</p>
        </div>
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className="posts-area">
        <div className="posts-header">
          <h3>Посты</h3>
          <span className="active-user-badge">Не выбран</span>
        </div>
        <div className="empty-state">
          <div className="empty-icon">👈</div>
          <h4>Выберите пользователя</h4>
          <p>Нажмите на любого пользователя слева, чтобы увидеть его посты</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="posts-area">
        <div className="posts-header">
          <h3>Посты</h3>
          <span className="active-user-badge">{selectedUser.name}</span>
        </div>
        <div className="empty-state">
          <div className="empty-icon"></div>
          <h4>Нет постов</h4>
          <p>У пользователя {selectedUser.name} пока нет постов</p>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-area">
      <div className="posts-header">
        <h3>Посты</h3>
        <span className="active-user-badge">{selectedUser.name}</span>
      </div>
      <div className="posts-list">
        {posts.map((post, index) => {
          const isExpanded = expandedPosts[post.id] || false;
          const showButton = shouldShowButton(post.body);
          const displayText = getPostText(post.body, isExpanded);
          
          return (
            <div key={post.id} className="post-card" style={{ animationDelay: `${index * 0.05}s` }}>
              <div className="post-number">#{post.id}</div>
              <div className="post-title">{post.title}</div>
              <div className="post-text">{displayText}</div>
              <div className="post-footer">
                {showButton && (
                  <button 
                    className="read-more-btn"
                    onClick={() => togglePost(post.id)}
                  >
                    {isExpanded ? 'Свернуть ↑' : 'Читать далее →'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostsArea;