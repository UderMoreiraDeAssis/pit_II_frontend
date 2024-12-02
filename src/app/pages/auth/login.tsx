// /pages/auth/login.tsx
import LoginForm from '../../components/Auth/LoginForm';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const LoginPage = () => {
  const { user } = useContext(AuthContext);

  // Redireciona se já estiver autenticado
  useEffect(() => {
    if (user) {
      window.location.href = '/';
    }
  }, [user]);

  return <LoginForm />;
};

export default LoginPage;
