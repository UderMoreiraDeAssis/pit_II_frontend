// /components/Users/UserList.tsx
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import UserItem from './UserItem';
import UserForm from './UserForm';
import { toast } from 'react-toastify';

type User = {
  _id: string;
  name: string;
  email: string;
};

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao buscar usuários');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = (user: User) => {
    setUsers([...users, user]);
  };

  const updateUserInList = (updatedUser: User) => {
    setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
  };

  const removeUserFromList = (id: string) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto p-4">
      <UserForm addUser={addUser} />
      <h2 className="text-xl font-bold mb-2">Lista de Usuários</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Nome</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserItem
              key={user._id}
              user={user}
              updateUserInList={updateUserInList}
              removeUserFromList={removeUserFromList}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
