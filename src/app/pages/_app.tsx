// /pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import Navbar from '../components/Layout/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer />
    </AuthProvider>
  );
}

export default MyApp;
