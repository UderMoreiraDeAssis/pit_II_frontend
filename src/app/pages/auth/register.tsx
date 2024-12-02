// /pages/auth/register.tsx
import RegisterForm from '../../components/Auth/RegisterForm';
import ProtectedRoute from '../../utils/ProtectedRoute';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const RegisterPage = () => {
  const { user } = useContext(AuthContext);

  // Redireciona se já estiver autenticado
  useEffect(() => {
    if (user) {
      window.location.href = '/';
    }
  }, [user]);

  return <RegisterForm />;
};

export default RegisterPage;
