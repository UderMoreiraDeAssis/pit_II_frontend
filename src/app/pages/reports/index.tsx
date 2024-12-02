// /pages/reports/index.tsx
import React from 'react';
import ExportReport from '../../components/Reports/ExportReport';
import ProtectedRoute from '../../utils/ProtectedRoute';

const ReportsPage = () => {
  return (
    <ProtectedRoute>
      <ExportReport />
    </ProtectedRoute>
  );
};

export default ReportsPage;
