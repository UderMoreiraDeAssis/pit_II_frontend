// /components/Notifications/NotificationForm.tsx
import React, { useState } from 'react';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';

const NotificationForm = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/notifications/email', { to, subject, text });
      setTo('');
      setSubject('');
      setText('');
      toast.success('Email enviado com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao enviar email');
    }
  };

  return (
    <form onSubmit={sendEmail} className="mb-4">
      <h3 className="text-lg mb-2">Enviar Notificação por Email</h3>
      <div className="flex flex-col mb-2">
        <label>Para:</label>
        <input
          className="border p-2"
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col mb-2">
        <label>Assunto:</label>
        <input
          className="border p-2"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col mb-2">
        <label>Texto:</label>
        <textarea
          className="border p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
      </div>
      <button className="bg-blue-500 text-white p-2 rounded" type="submit">
        Enviar Email
      </button>
    </form>
  );
};

export default NotificationForm;
