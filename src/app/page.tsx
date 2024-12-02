"use client";

import { useEffect, useState } from "react";
import { User } from "./types";

export default function Home() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      console.log(process.env.NEXT_PUBLIC_API_URL);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users?.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
