// /components/Auth/RegisterForm.tsx
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      toast.success('Registrado com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl mb-4">Registrar</h2>
      <div className="mb-4">
        <label className="block mb-1">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2"
        />
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Registrar
      </button>
    </form>
  );
};

export default RegisterForm;
