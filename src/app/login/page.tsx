"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Importação do hook de navegação do Next.js
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Hook para redirecionamento

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      const { token, userName } = await res.json(); // Supondo que a API retorne o nome do usuário
      toast.success("🎉 Login realizado com sucesso!");
      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName); // Armazenando o nome do usuário (opcional)
      setEmail("");
      setPassword("");

      // Redireciona para o dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro inesperado.");
      toast.error(`❌ ${err.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <label htmlFor="email" className="text-sm font-medium">
          Email:
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <label htmlFor="password" className="text-sm font-medium">
          Senha:
        </label>
        <input
          id="password"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
