'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

type User = {
  _id: string;
  name: string;
  email: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

// Dentro do componente Home
console.log('process.env.NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);


  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/users`;

  console.log('API_URL:', API_URL);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, { name, email });
      setUsers([...users, response.data]);
      setName('');
      setEmail('');
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const updateUser = async (id: string) => {
    const newName = prompt('Enter new name:');
    const newEmail = prompt('Enter new email:');
    if (newName && newEmail) {
      try {
        const response = await axios.put(`${API_URL}/${id}`, {
          name: newName,
          email: newEmail,
        });
        setUsers(
          users.map(user => (user._id === id ? response.data : user))
        );
      } catch (err) {
        console.error('Error updating user:', err);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Usuários</h1>

      <form onSubmit={createUser} className="mb-4">
        <div className="flex flex-col mb-2">
          <label>Nome:</label>
          <input
            className="border p-2"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col mb-2">
          <label>Email:</label>
          <input
            className="border p-2"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          type="submit"
        >
          Adicionar Usuário
        </button>
      </form>

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
          {users.map(user => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => updateUser(user._id)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteUser(user._id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}