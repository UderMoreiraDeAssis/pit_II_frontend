// /components/Users/UserItem.tsx
import React from 'react';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';

type User = {
  _id: string;
  name: string;
  email: string;
};

type Props = {
  user: User;
  updateUserInList: (user: User) => void;
  removeUserFromList: (id: string) => void;
};

const UserItem = ({ user, updateUserInList, removeUserFromList }: Props) => {
  const deleteUser = async () => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await axios.delete(`/api/users/${user._id}`);
        removeUserFromList(user._id);
        toast.success('Usuário excluído com sucesso!');
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Erro ao excluir usuário');
      }
    }
  };

  const updateUser = async () => {
    const newName = prompt('Digite o novo nome:', user.name);
    const newEmail = prompt('Digite o novo email:', user.email);
    if (newName && newEmail) {
      try {
        const response = await axios.put(`/api/users/${user._id}`, {
          name: newName,
          email: newEmail,
        });
        updateUserInList(response.data);
        toast.success('Usuário atualizado com sucesso!');
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Erro ao atualizar usuário');
      }
    }
  };

  return (
    <tr>
      <td className="border px-4 py-2">{user.name}</td>
      <td className="border px-4 py-2">{user.email}</td>
      <td className="border px-4 py-2">
        <button
          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
          onClick={updateUser}
        >
          Editar
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={deleteUser}
        >
          Excluir
        </button>
      </td>
    </tr>
  );
};

export default UserItem;
