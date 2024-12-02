// /components/Layout/Navbar.tsx
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div>
        <Link href="/">
          <a className="mr-4">Home</a>
        </Link>
        {user && (
          <>
            <Link href="/users">
              <a className="mr-4">Usuários</a>
            </Link>
            <Link href="/projects">
              <a className="mr-4">Projetos</a>
            </Link>
            <Link href="/tasks">
              <a className="mr-4">Tarefas</a>
            </Link>
            <Link href="/time-entries">
              <a className="mr-4">Entradas de Tempo</a>
            </Link>
            <Link href="/notifications">
              <a className="mr-4">Notificações</a>
            </Link>
            <Link href="/productivity">
              <a className="mr-4">Produtividade</a>
            </Link>
            <Link href="/reports">
              <a className="mr-4">Relatórios</a>
            </Link>
          </>
        )}
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">Olá, {user.name}</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login">
              <a className="mr-4">Login</a>
            </Link>
            <Link href="/auth/register">
              <a>Registrar</a>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
