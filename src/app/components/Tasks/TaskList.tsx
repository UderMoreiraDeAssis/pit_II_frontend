// /components/Tasks/TaskList.tsx
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { toast } from 'react-toastify';

type Task = {
  _id: string;
  project: string;
  title: string;
  description?: string;
  dueDate?: string;
  assignedTo?: string;
};

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao buscar tarefas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTaskInList = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
  };

  const removeTaskFromList = (id: string) => {
    setTasks(tasks.filter((task) => task._id !== id));
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto p-4">
      <TaskForm addTask={addTask} />
      <h2 className="text-xl font-bold mb-2">Lista de Tarefas</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Título</th>
            <th className="px-4 py-2 border">Descrição</th>
            <th className="px-4 py-2 border">Deadline</th>
            <th className="px-4 py-2 border">Atribuído a</th>
            <th className="px-4 py-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              updateTaskInList={updateTaskInList}
              removeTaskFromList={removeTaskFromList}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
