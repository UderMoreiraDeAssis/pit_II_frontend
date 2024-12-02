// /components/Projects/ProjectForm.tsx
import React, { useState } from 'react';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';

type Project = {
  _id: string;
  name: string;
  description?: string;
  deadline?: string;
  members: string[];
};

type Props = {
  addProject: (project: Project) => void;
};

const ProjectForm = ({ addProject }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/projects', { name, description, deadline });
      addProject(response.data);
      setName('');
      setDescription('');
      setDeadline('');
      toast.success('Projeto adicionado com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao adicionar projeto');
    }
  };

  return (
    <form onSubmit={createProject} className="mb-4">
      <h3 className="text-lg mb-2">Adicionar Projeto</h3>
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
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <button className="bg-green-500 text-white p-2 rounded" type="submit">
        Adicionar Projeto
      </button>
    </form>
  );
};

export default ProjectForm;
