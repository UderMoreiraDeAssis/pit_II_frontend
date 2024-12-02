// /components/Productivity/ProductivityDashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';

type ProductivityData = {
  [date: string]: number; // Data: Duração em segundos
};

const ProductivityDashboard = () => {
  const [userId, setUserId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [productivityData, setProductivityData] = useState<ProductivityData>({});
  const [users, setUsers] = useState<{ _id: string; name: string }[]>([]);
  const [projects, setProjects] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, projectsRes] = await Promise.all([
          axios.get('/api/users'),
          axios.get('/api/projects'),
        ]);
        setUsers(usersRes.data);
        setProjects(projectsRes.data);
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Erro ao buscar dados');
      }
    };
    fetchData();
  }, []);

  const fetchProductivityByUser = async () => {
    if (!userId) {
      toast.error('Selecione um usuário');
      return;
    }
    try {
      const response = await axios.get(`/api/productivity/user/${userId}`);
      setProductivityData(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao buscar dados de produtividade');
    }
  };

  const fetchProductivityByProject = async () => {
    if (!projectId) {
      toast.error('Selecione um projeto');
      return;
    }
    try {
      const response = await axios.get(`/api/productivity/project/${projectId}`);
      setProductivityData(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao buscar dados de produtividade');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard de Produtividade</h2>
      <div className="mb-4">
        <h3 className="text-lg mb-2">Por Usuário</h3>
        <div className="flex items-center mb-2">
          <select
            className="border p-2 mr-2"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          >
            <option value="">Selecione um usuário</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={fetchProductivityByUser}
          >
            Buscar
          </button>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg mb-2">Por Projeto</h3>
        <div className="flex items-center mb-2">
          <select
            className="border p-2 mr-2"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">Selecione um projeto</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={fetchProductivityByProject}
          >
            Buscar
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-lg mb-2">Dados de Produtividade</h3>
        {Object.keys(productivityData).length === 0 ? (
          <p>Nenhum dado para exibir.</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Data</th>
                <th className="px-4 py-2 border">Duração (Horas)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(productivityData).map(([date, duration]) => (
                <tr key={date}>
                  <td className="border px-4 py-2">{date}</td>
                  <td className="border px-4 py-2">{(duration / 3600).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductivityDashboard;
