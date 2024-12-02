// /components/TimeEntries/TimeEntryList.tsx
import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import TimeEntryItem from './TimeEntryItem';
import TimeEntryForm from './TimeEntryForm';
import { toast } from 'react-toastify';

type TimeEntry = {
  _id: string;
  user: string;
  task: string;
  startTime: string;
  endTime?: string;
  duration?: number;
};

const TimeEntryList = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTimeEntries = async () => {
    try {
      const response = await axios.get('/api/time-entries');
      setTimeEntries(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao buscar entradas de tempo');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeEntries();
  }, []);

  const addTimeEntry = (entry: TimeEntry) => {
    setTimeEntries([...timeEntries, entry]);
  };

  const updateTimeEntryInList = (updatedEntry: TimeEntry) => {
    setTimeEntries(timeEntries.map((entry) => (entry._id === updatedEntry._id ? updatedEntry : entry)));
  };

  const removeTimeEntryFromList = (id: string) => {
    setTimeEntries(timeEntries.filter((entry) => entry._id !== id));
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto p-4">
      <TimeEntryForm addTimeEntry={addTimeEntry} />
      <h2 className="text-xl font-bold mb-2">Lista de Entradas de Tempo</h2>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Usuário</th>
            <th className="px-4 py-2 border">Tarefa</th>
            <th className="px-4 py-2 border">Início</th>
            <th className="px-4 py-2 border">Fim</th>
            <th className="px-4 py-2 border">Duração (s)</th>
            <th className="px-4 py-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {timeEntries.map((entry) => (
            <TimeEntryItem
              key={entry._id}
              entry={entry}
              updateTimeEntryInList={updateTimeEntryInList}
              removeTimeEntryFromList={removeTimeEntryFromList}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeEntryList;
