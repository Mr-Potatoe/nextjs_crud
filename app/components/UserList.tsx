// app/components/UserList.tsx
'use client';

import { useState, useEffect } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

type UserListProps = {
  onEdit: (user: User) => void;
};

export default function UserList({ onEdit }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/getUsers');
      const data: User[] = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch('/api/deleteUser', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id}>
          {user.name} ({user.email})
          <button onClick={() => onEdit(user)}>Edit</button>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
