// app/page.tsx
'use client';

import { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<{ id: number; name: string; email: string } | null>(null);

  const handleSuccess = () => {
    setSelectedUser(null); // Clear selected user after successful operation
  };

  return (
    <div>
      <h1>Next.js & MySQL CRUD</h1>
      <UserForm onSuccess={handleSuccess} user={selectedUser} />
      <UserList onEdit={(user) => setSelectedUser(user)} />
    </div>
  );
}
