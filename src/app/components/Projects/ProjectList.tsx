// /components/Projects/ProjectList.tsx
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import ProjectItem from './ProjectItem';
import ProjectForm from './ProjectForm';
import { toast } from 'react-toastify';

type Project = {
  _id: string;
  name: string;
  description?: string;
  deadline?: string;
  members: string[];
};

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao buscar projetos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  const updateProjectInList = (updatedProject: Project) => {
    setProjects(projects.map((proj) => (proj._id === updatedProject._id ? updatedProject : proj)));
  };

  const removeProjectFromList = (id: string) => {
    setProjects(projects.filter((proj) => proj._id !== id));
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto p-4">
      <ProjectForm addProject={addProject} />
      <h2 className="text-xl font-bold mb-2">Lista de Projetos</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Nome</th>
            <th className="px-4 py-2 border">Descrição</th>
            <th className="px-4 py-2 border">Deadline</th>
            <th className="px-4 py-2 border">Membros</th>
            <th className="px-4 py-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <ProjectItem
              key={project._id}
              project={project}
              updateProjectInList={updateProjectInList}
              removeProjectFromList={removeProjectFromList}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
