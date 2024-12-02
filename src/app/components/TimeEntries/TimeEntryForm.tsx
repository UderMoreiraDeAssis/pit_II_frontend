// /components/TimeEntries/TimeEntryForm.tsx
import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';

type TimeEntry = {
  _id: string;
  user: string;
  task: string;
  startTime: string;
  endTime?: string;
  duration?: number;
};

type Task = {
  _id: string;
  title: string;
};

type User = {
  _id: string;
  name: string;
};

type Props = {
  addTimeEntry: (entry: TimeEntry) => void;
};

const TimeEntryForm = ({ addTimeEntry }: Props) => {
  const [userId, setUserId] = useState('');
  const [taskId, setTaskId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, tasksRes] = await Promise.all([
          axios.get('/api/users'),
          axios.get('/api/tasks'),
        ]);
        setUsers(usersRes.data);
        setTasks(tasksRes.data);
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Erro ao buscar dados');
      }
    };
    fetchData();
  }, []);

  const createTimeEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        user: userId,
        task: taskId,
        startTime,
      };
      if (endTime) payload.endTime = endTime;
      const response = await axios.post('/api/time-entries', payload);
      addTimeEntry(response.data);
      setUserId('');
      setTaskId('');
      setStartTime('');
      setEndTime('');
      toast.success('Entrada de tempo adicionada com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao adicionar entrada de tempo');
    }
  };

  return (
    <form onSubmit={createTimeEntry} className="mb-4">
      <h3 className="text-lg mb-2">Adicionar Entrada de Tempo</h3>
      <div className="flex flex-col mb-2">
        <label>Usuário:</label>
        <select
          className="border p-2"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        >
          <option value="">Selecione um usuário</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col mb-2">
        <label>Tarefa:</label>
        <select
          className="border p-2"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          required
        >
          <option value="">Selecione uma tarefa</option>
          {tasks.map((task) => (
            <option key={task._id} value={task._id}>
              {task.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col mb-2">
        <label>Início:</label>
        <input
          className="border p-2"
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col mb-2">
        <label>Fim:</label>
        <input
          className="border p-2"
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <button className="bg-green-500 text-white p-2 rounded" type="submit">
        Adicionar Entrada
      </button>
    </form>
  );
};

export default TimeEntryForm;
