// /utils/ProtectedRoute.tsx
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return children;
};

export default ProtectedRoute;
