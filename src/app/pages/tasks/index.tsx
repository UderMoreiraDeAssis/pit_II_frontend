// /pages/tasks/index.tsx
import React from 'react';
import TaskList from '../../components/Tasks/TaskList';
import ProtectedRoute from '../../utils/ProtectedRoute';

const TasksPage = () => {
  return (
    <ProtectedRoute>
      <TaskList />
    </ProtectedRoute>
  );
};

export default TasksPage;
