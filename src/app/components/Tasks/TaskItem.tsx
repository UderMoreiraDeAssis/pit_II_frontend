// /components/Tasks/TaskItem.tsx
import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';

type Task = {
  _id: string;
  project: string;
  title: string;
  description?: string;
  dueDate?: string;
  assignedTo?: string;
};

type User = {
  _id: string;
  name: string;
};

type Props = {
  task: Task;
  updateTaskInList: (task: Task) => void;
  removeTaskFromList: (id: string) => void;
};

const TaskItem = ({ task, updateTaskInList, removeTaskFromList }: Props) => {
  const [projectName, setProjectName] = useState('');
  const [assignedUser, setAssignedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchRelatedData = async () => {
      try {
        const [projectRes, userRes] = await Promise.all([
          axios.get(`/api/projects/${task.project}`),
          task.assignedTo ? axios.get(`/api/users/${task.assignedTo}`) : Promise.resolve({ data: null }),
        ]);
        setProjectName(projectRes.data.name);
        setAssignedUser(userRes.data);
      } catch (error: any) {
        console.error('Erro ao buscar dados relacionados:', error);
      }
    };
    fetchRelatedData();
  }, [task]);

  const deleteTask = async () => {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      try {
        await axios.delete(`/api/tasks/${task._id}`);
        removeTaskFromList(task._id);
        toast.success('Tarefa excluída com sucesso!');
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Erro ao excluir tarefa');
      }
    }
  };

  const updateTask = async () => {
    const newTitle = prompt('Digite o novo título:', task.title);
    const newDescription = prompt('Digite a nova descrição:', task.description || '');
    const newDueDate = prompt('Digite a nova deadline (YYYY-MM-DD):', task.dueDate?.split('T')[0] || '');
    if (newTitle && newDescription !== null && newDueDate !== null) {
      try {
        const response = await axios.put(`/api/tasks/${task._id}`, {
          title: newTitle,
          description: newDescription,
          dueDate: newDueDate,
        });
        updateTaskInList(response.data);
        toast.success('Tarefa atualizada com sucesso!');
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Erro ao atualizar tarefa');
      }
    }
  };

  return (
    <tr>
      <td className="border px-4 py-2">{task.title}</td>
      <td className="border px-4 py-2">{task.description}</td>
      <td className="border px-4 py-2">{task.dueDate?.split('T')[0]}</td>
      <td className="border px-4 py-2">{assignedUser ? assignedUser.name : 'Nenhum'}</td>
      <td className="border px-4 py-2">
        <button
          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
          onClick={updateTask}
        >
          Editar
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={deleteTask}
        >
          Excluir
        </button>
      </td>
    </tr>
  );
};

export default TaskItem;
