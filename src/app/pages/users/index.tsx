// /pages/users/index.tsx
import React from 'react';
import UserList from '../../components/Users/UserList';
import ProtectedRoute from '../../utils/ProtectedRoute';

const UsersPage = () => {
  return (
    <ProtectedRoute>
      <UserList />
    </ProtectedRoute>
  );
};

export default UsersPage;
