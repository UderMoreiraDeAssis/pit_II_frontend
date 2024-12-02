import React from 'react';
import NotificationForm from './NotificationForm';
import PushNotificationForm from './PushNotificationForm';

const NotificationDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <NotificationForm />
      <PushNotificationForm />
    </div>
  );
};

export default NotificationDashboard;
