// /pages/projects/index.tsx
import React from 'react';
import ProjectList from '../../components/Projects/ProjectList';
import ProtectedRoute from '../../utils/ProtectedRoute';

const ProjectsPage = () => {
  return (
    <ProtectedRoute>
      <ProjectList />
    </ProtectedRoute>
  );
};

export default ProjectsPage;
