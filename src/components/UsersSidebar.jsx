import React from 'react';
import './UsersSidebar.css';

const UsersSidebar = ({ users, currentUserId, onSelectUser, loading, error }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (id) => {
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
    return colors[id % colors.length];
  };

  if (loading) {
    return (
      <div className="users-sidebar">
        <h2>Пользователи</h2>
        <div className="loading-users">
          <div className="spinner"></div>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-sidebar">
        <h2>Пользователи</h2>
        <div className="error-message">Ошибка: {error}</div>
      </div>
    );
  }

  return (
    <div className="users-sidebar">
      <h2>
        Пользователи
        <span className="users-count">{users.length}</span>
      </h2>
      <div className="users-list">
        {users.map((user) => (
          <div
            key={user.id}
            className={`user-item ${currentUserId === user.id ? 'active' : ''}`}
            onClick={() => onSelectUser(user.id)}
          >
            <div className="user-avatar" style={{ background: getRandomColor(user.id) }}>
              {getInitials(user.name)}
            </div>
            <div className="user-info">
              <div className="user-name">{user.name}</div>
              <div className="user-username">@{user.username}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersSidebar;