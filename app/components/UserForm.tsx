// app/components/UserForm.tsx
'use client';

import { useState } from 'react';

type UserFormProps = {
  onSuccess: () => void;
  user?: { id: number; name: string; email: string } | null; // Allow null here
};

export default function UserForm({ onSuccess, user }: UserFormProps) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = user ? 'PUT' : 'POST';
    const url = user ? '/api/updateUser' : '/api/addUser';
    const body = JSON.stringify({ id: user?.id, name, email });

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">{user ? 'Update User' : 'Add User'}</button>
    </form>
  );
}
