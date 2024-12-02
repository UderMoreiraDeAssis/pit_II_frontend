'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

type User = { _id: string; name: string; email: string };
type Project = { _id: string; name: string; description: string };
type Task = { _id: string; title: string; description: string; assignedTo?: User };

export default function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  // States
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const [newTask, setNewTask] = useState({ title: '', description: '', assignedTo: '' });

  // Fetch Functions
  const fetchData = useCallback(async () => {
    try {
      const [usersRes, projectsRes, tasksRes] = await Promise.all([
        axios.get(`${API_URL}/api/users`),
        axios.get(`${API_URL}/api/projects`),
        axios.get(`${API_URL}/api/tasks`),
      ]);
      setUsers(usersRes.data);
      setProjects(projectsRes.data);
      setTasks(tasksRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // User Functions
  const createUser = async (e: React.FormEvent, name: string, email: string) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/users`, { name, email });
      setUsers([...users, response.data]);
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  const updateUser = async (id: string, updatedData: Partial<User>) => {
    try {
      const response = await axios.put(`${API_URL}/api/users/${id}`, updatedData);
      setUsers(users.map(user => (user._id === id ? response.data : user)));
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  // Project Functions
  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/projects`, newProject);
      setProjects([...projects, response.data]);
      setNewProject({ name: '', description: '' });
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  const updateProject = async (id: string, updatedData: Partial<Project>) => {
    try {
      const response = await axios.put(`${API_URL}/api/projects/${id}`, updatedData);
      setProjects(projects.map(project => (project._id === id ? response.data : project)));
    } catch (err) {
      console.error('Error updating project:', err);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/api/projects/${id}`);
      setProjects(projects.filter(project => project._id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  // Task Functions
  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/tasks`, newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '', assignedTo: '' });
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const updateTask = async (id: string, updatedData: Partial<Task>) => {
    try {
      const response = await axios.put(`${API_URL}/api/tasks/${id}`, updatedData);
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <section>
        <h2 className="text-xl font-bold">Usuários</h2>
        {/* User Management */}
        {/* Similar blocks for projects and tasks */}
      </section>
    </div>
  );
}
