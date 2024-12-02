// /components/TimeEntries/TimeEntryItem.tsx
import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';

type TimeEntry = {
  _id: string;
  user: string;
  task: string;
  startTime: string;
  endTime?: string;
  duration?: number;
};

type User = {
  _id: string;
  name: string;
};

type Task = {
  _id: string;
  title: string;
};

type Props = {
  entry: TimeEntry;
  updateTimeEntryInList: (entry: TimeEntry) => void;
  removeTimeEntryFromList: (id: string) => void;
};

const TimeEntryItem = ({ entry, updateTimeEntryInList, removeTimeEntryFromList }: Props) => {
  const [userName, setUserName] = useState('');
  const [taskTitle, setTaskTitle] = useState('');

  useEffect(() => {
    const fetchRelatedData = async () => {
      try {
        const [userRes, taskRes] = await Promise.all([
          axios.get(`/api/users/${entry.user}`),
          axios.get(`/api/tasks/${entry.task}`),
        ]);
        setUserName(userRes.data.name);
        setTaskTitle(taskRes.data.title);
      } catch (error: any) {
        console.error('Erro ao buscar dados relacionados:', error);
      }
    };
    fetchRelatedData();
  }, [entry]);

  const deleteTimeEntry = async () => {
    if (confirm('Tem certeza que deseja excluir esta entrada de tempo?')) {
      try {
        await axios.delete(`/api/time-entries/${entry._id}`);
        removeTimeEntryFromList(entry._id);
        toast.success('Entrada de tempo excluída com sucesso!');
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Erro ao excluir entrada de tempo');
      }
    }
  };

  const updateTimeEntry = async () => {
    const newStartTime = prompt('Digite a nova hora de início:', entry.startTime);
    const newEndTime = prompt('Digite a nova hora de fim:', entry.endTime || '');
    if (newStartTime !== null && newEndTime !== null) {
      try {
        const payload: any = {
          startTime: newStartTime,
        };
        if (newEndTime) payload.endTime = newEndTime;
        const response = await axios.put(`/api/time-entries/${entry._id}`, payload);
        updateTimeEntryInList(response.data);
        toast.success('Entrada de tempo atualizada com sucesso!');
      } catch (error: any) {
        toast.error(error.response?.data?.error || 'Erro ao atualizar entrada de tempo');
      }
    }
  };

  return (
    <tr>
      <td className="border px-4 py-2">{userName}</td>
      <td className="border px-4 py-2">{taskTitle}</td>
      <td className="border px-4 py-2">{new Date(entry.startTime).toLocaleString()}</td>
      <td className="border px-4 py-2">
        {entry.endTime ? new Date(entry.endTime).toLocaleString() : 'Em andamento'}
      </td>
      <td className="border px-4 py-2">{entry.duration || 'N/A'}</td>
      <td className="border px-4 py-2">
        <button
          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
          onClick={updateTimeEntry}
        >
          Editar
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={deleteTimeEntry}
        >
          Excluir
        </button>
      </td>
    </tr>
  );
};

export default TimeEntryItem;
