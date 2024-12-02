// /pages/productivity/index.tsx
import React from 'react';
import ProductivityDashboard from '../../components/Productivity/ProductivityDashboard';
import ProtectedRoute from '../../utils/ProtectedRoute';

const ProductivityPage = () => {
  return (
    <ProtectedRoute>
      <ProductivityDashboard />
    </ProtectedRoute>
  );
};

export default ProductivityPage;
