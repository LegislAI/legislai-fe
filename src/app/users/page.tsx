'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

import { getAllUsers } from '../../services/authService';
import { JWT } from 'next-auth/jwt';

export default function UsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('session:', session);
  }, [session]);

  useEffect(() => {
    console.log('users:', users);
  }, [users]);

  // Exibe mensagem de erro, se houver
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <button onClick={fetchUsers}>Fetch Users</button>
    </div>
  );

  async function fetchUsers() {
    if (session?.accessToken) {
      try {
        const response = await getAllUsers(
          session.accessToken as unknown as JWT,
        );
        setUsers(response.data || []);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setError('Erro ao buscar usuários.');
      }
    }
  }
}
