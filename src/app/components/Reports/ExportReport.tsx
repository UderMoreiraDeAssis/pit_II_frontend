// /components/Reports/ExportReport.tsx
import React from 'react';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';

const ExportReport = () => {
  const exportCSV = async () => {
    try {
      const response = await axios.get('/api/reports/export-csv', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'time_entries.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      toast.success('Relatório exportado com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao exportar relatório');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Relatórios</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={exportCSV}
      >
        Exportar Entradas de Tempo (CSV)
      </button>
    </div>
  );
};

export default ExportReport;
