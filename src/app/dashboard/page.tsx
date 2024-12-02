"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [tasks, setTasks] = useState([
    { id: 1, name: "Design new landing page", deadline: "2024-12-05" },
    { id: 2, name: "Fix bug #3421", deadline: "2024-12-03" },
    { id: 3, name: "Prepare monthly report", deadline: "2024-12-07" },
  ]);

  useEffect(() => {
    // Obtém os dados do usuário armazenados após o login
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login"); // Redireciona para login se não estiver autenticado
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Passa o token no cabeçalho
          },
        });

        if (!response.ok) {
          throw new Error("Falha ao carregar informações do usuário.");
        }

        const userData = await response.json();
        setUser(userData); // Define os dados do usuário no estado
      } catch (error) {
        console.error(error);
        router.push("/login"); // Redireciona se algo der errado
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="text-center text-2xl font-bold mb-8">TempoTrack</div>
        <nav className="space-y-4">
          <a href="/projects" className="block py-2 px-4 rounded hover:bg-gray-700">
            Projetos
          </a>
          <a href="/tasks" className="block py-2 px-4 rounded hover:bg-gray-700">
            Tarefas
          </a>
          <a href="/reports" className="block py-2 px-4 rounded hover:bg-gray-700">
            Relatórios
          </a>
          <a href="/notifications" className="block py-2 px-4 rounded hover:bg-gray-700">
            Notificações
          </a>
          <a href="/settings" className="block py-2 px-4 rounded hover:bg-gray-700">
            Configurações
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Menu Principal</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              {user ? `Olá, ${user.name}` : "Carregando..."}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Dashboard */}
        <main className="p-6 bg-gray-100 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Productivity Summary */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Resumo de Produtividade</h2>
              <div className="h-40 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-600">[Gráfico de produtividade]</span>
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Tarefas Pendentes</h2>
              <ul className="space-y-2">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="p-2 border rounded flex justify-between items-center"
                  >
                    <span>{task.name}</span>
                    <span className="text-gray-500 text-sm">Prazo: {task.deadline}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Reports */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Relatórios Recentes</h2>
              <ul className="space-y-2">
                <li className="p-2 border rounded">Relatório de Novembro</li>
                <li className="p-2 border rounded">Relatório de Out/Nov</li>
                <li className="p-2 border rounded">Estatísticas Semanais</li>
              </ul>
            </div>
          </div>

          {/* Work Hours Registration */}
          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Registro de Horas</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="task" className="block text-sm font-medium">
                  Tarefa
                </label>
                <select
                  id="task"
                  className="w-full border p-2 rounded mt-1"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione uma tarefa
                  </option>
                  {tasks.map((task) => (
                    <option key={task.id} value={task.id}>
                      {task.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-4">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium">
                    Hora de Início
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    className="w-full border p-2 rounded mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium">
                    Hora de Fim
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    className="w-full border p-2 rounded mt-1"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
              >
                Registrar Horas
              </button>
            </form>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white text-center py-4">
          <p>
            © 2023 TempoTrack. Todos os direitos reservados. Versão 1.0.0
          </p>
        </footer>
      </div>
    </div>
  );
}
