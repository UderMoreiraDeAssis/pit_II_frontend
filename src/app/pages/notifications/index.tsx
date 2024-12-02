// /pages/notifications/index.tsx
import React from 'react';
import NotificationDashboard from '../../components/Notifications/NotificationDashboard';
import ProtectedRoute from '../../utils/ProtectedRoute';

const NotificationsPage = () => {
  return (
    <ProtectedRoute>
      <NotificationDashboard />
    </ProtectedRoute>
  );
};

export default NotificationsPage;
