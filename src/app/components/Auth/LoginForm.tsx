// /components/Auth/LoginForm.tsx
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Logado com sucesso!');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Erro ao logar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl mb-4">Login</h2>
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
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
