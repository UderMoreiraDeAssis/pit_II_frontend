// /components/Projects/ProjectItem.tsx
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
  project: Project;
  updateProjectInList: (project: Project) => void;
  removeProjectFromList: (id: string) => void;
};

const ProjectItem = ({ project, updateProjectInList, removeProjectFromList }: Props) => {
  const [members, setMembers] = useState<string[]>(project.members);

  const deleteProject = async () => {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        await axios.delete(`/api/projects/${project._id}`);
        removeProjectFromList(project._id);
        toast.success('Projeto excluído com sucesso!');
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Erro ao excluir projeto');
      }
    }
  };

  const updateProject = async () => {
    const newName = prompt('Digite o novo nome:', project.name);
    const newDescription = prompt('Digite a nova descrição:', project.description || '');
    const newDeadline = prompt('Digite a nova deadline (YYYY-MM-DD):', project.deadline?.split('T')[0] || '');
    if (newName && newDescription !== null && newDeadline !== null) {
      try {
        const response = await axios.put(`/api/projects/${project._id}`, {
          name: newName,
          description: newDescription,
          deadline: newDeadline,
        });
        updateProjectInList(response.data);
        toast.success('Projeto atualizado com sucesso!');
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Erro ao atualizar projeto');
      }
    }
  };

  return (
    <tr>
      <td className="border px-4 py-2">{project.name}</td>
      <td className="border px-4 py-2">{project.description}</td>
      <td className="border px-4 py-2">{project.deadline?.split('T')[0]}</td>
      <td className="border px-4 py-2">
        {project.members.length > 0 ? project.members.join(', ') : 'Nenhum membro'}
      </td>
      <td className="border px-4 py-2">
        <button
          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
          onClick={updateProject}
        >
          Editar
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={deleteProject}
        >
          Excluir
        </button>
      </td>
    </tr>
  );
};

export default ProjectItem;
