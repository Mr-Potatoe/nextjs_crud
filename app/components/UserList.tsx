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
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/getUsers');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data: User[] = await res.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Unexpected data format:', data);
          setError('Failed to load users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch('/api/deleteUser', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        throw new Error('Failed to delete user');
      }

      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading message
  if (error) return <div>{error}</div>; // Show error message

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
