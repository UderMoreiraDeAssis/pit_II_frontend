// /components/Tasks/TaskForm.tsx
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

type Project = {
  _id: string;
  name: string;
};

type User = {
  _id: string;
  name: string;
};

type Props = {
  addTask: (task: Task) => void;
};

const TaskForm = ({ addTask }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [projectId, setProjectId] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [assignedTo, setAssignedTo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, usersRes] = await Promise.all([
          axios.get('/api/projects'),
          axios.get('/api/users'),
        ]);
        setProjects(projectsRes.data);
        setUsers(usersRes.data);
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Erro ao buscar dados');
      }
    };
    fetchData();
  }, []);

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/tasks', {
        title,
        description,
        dueDate,
        project: projectId,
        assignedTo: assignedTo || null,
      });
      addTask(response.data);
      setTitle('');
      setDescription('');
      setDueDate('');
      setProjectId('');
      setAssignedTo('');
      toast.success('Tarefa adicionada com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao adicionar tarefa');
    }
  };

  return (
    <form onSubmit={createTask} className="mb-4">
      <h3 className="text-lg mb-2">Adicionar Tarefa</h3>
      <div className="flex flex-col mb-2">
        <label>Título:</label>
        <input
          className="border p-2"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col mb-2">
        <label>Descrição:</label>
        <textarea
          className="border p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="flex flex-col mb-2">
        <label>Deadline:</label>
        <input
          className="border p-2"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-2">
        <label>Projeto:</label>
        <select
          className="border p-2"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        >
          <option value="">Selecione um projeto</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col mb-2">
        <label>Atribuir a:</label>
        <select
          className="border p-2"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        >
          <option value="">Nenhum</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <button className="bg-green-500 text-white p-2 rounded" type="submit">
        Adicionar Tarefa
      </button>
    </form>
  );
};

export default TaskForm;
