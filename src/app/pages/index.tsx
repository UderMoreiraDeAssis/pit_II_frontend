// /pages/index.tsx
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import ProtectedRoute from '../utils/ProtectedRoute';

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo ao TempoTrack</h1>
        {user && (
          <p>
            Olá, {user.name}! Use o menu de navegação para gerenciar usuários, projetos, tarefas, entradas de tempo e muito mais.
          </p>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
