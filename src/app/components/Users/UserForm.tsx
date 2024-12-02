// /components/Users/UserForm.tsx
import React, { useState } from 'react';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';

type User = {
  _id: string;
  name: string;
  email: string;
};

type Props = {
  addUser: (user: User) => void;
};

const UserForm = ({ addUser }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', { name, email });
      addUser(response.data);
      setName('');
      setEmail('');
      toast.success('Usuário adicionado com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao adicionar usuário');
    }
  };

  return (
    <form onSubmit={createUser} className="mb-4">
      <div className="flex flex-col mb-2">
        <label>Nome:</label>
        <input
          className="border p-2"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col mb-2">
        <label>Email:</label>
        <input
          className="border p-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button className="bg-blue-500 text-white p-2 rounded" type="submit">
        Adicionar Usuário
      </button>
    </form>
  );
};

export default UserForm;
