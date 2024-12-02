// /components/Notifications/PushNotificationForm.tsx
import React, { useState } from 'react';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';

const PushNotificationForm = () => {
  const [token, setToken] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const sendPush = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/notifications/push', { token, title, body });
      setToken('');
      setTitle('');
      setBody('');
      toast.success('Notificação push enviada com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao enviar notificação push');
    }
  };

  return (
    <form onSubmit={sendPush} className="mb-4">
      <h3 className="text-lg mb-2">Enviar Notificação Push</h3>
      <div className="flex flex-col mb-2">
        <label>Token:</label>
        <input
          className="border p-2"
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col mb-2">
        <label>Título:</label>
        <input
          className="border p-2"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col mb-2">
        <label>Corpo:</label>
        <textarea
          className="border p-2"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
      </div>
      <button className="bg-blue-500 text-white p-2 rounded" type="submit">
        Enviar Notificação Push
      </button>
    </form>
  );
};

export default PushNotificationForm;
