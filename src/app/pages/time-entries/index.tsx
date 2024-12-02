// /pages/time-entries/index.tsx
import React from 'react';
import TimeEntryList from '../../components/TimeEntries/TimeEntryList';
import ProtectedRoute from '../../utils/ProtectedRoute';

const TimeEntriesPage = () => {
  return (
    <ProtectedRoute>
      <TimeEntryList />
    </ProtectedRoute>
  );
};

export default TimeEntriesPage;
