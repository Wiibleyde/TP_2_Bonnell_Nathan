import { useEffect, useState } from 'react';
import type { User } from './types';
import { userService } from './services/userService';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

interface UserFormData {
  name: string;
  email: string;
  role: 'user' | 'admin';
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    userService.getAll()
      .then((res) => setUsers(res.data.data))
      .catch(() => setError('Erreur lors du chargement des utilisateurs.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(data: UserFormData) {
    if (selectedUser) {
      try {
        const res = await userService.update(selectedUser._id, data as User);
        setUsers((prev) => prev.map((u) => (u._id === selectedUser._id ? res.data.data : u)));
        setSelectedUser(null);
      } catch {
        setError('Erreur lors de la mise à jour de l\'utilisateur.');
      }
    } else {
      try {
        const res = await userService.create(data as User);
        setUsers((prev) => [...prev, res.data.data]);
      } catch {
        setError('Erreur lors de la création de l\'utilisateur.');
      }
    }
  }

  async function handleDelete(id: string) {
    try {
      await userService.remove(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      if (selectedUser?._id === id) setSelectedUser(null);
    } catch {
      setError('Erreur lors de la suppression de l\'utilisateur.');
    }
  }

  return (
    <div>
      <Navbar count={users.length} />
      <div style={{ padding: '32px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <UserForm
          onSubmit={handleSubmit}
          selectedUser={selectedUser}
          onCancel={() => setSelectedUser(null)}
        />
        <div style={{ marginTop: '32px' }}>
          <UserList
            users={users}
            loading={loading}
            error={error}
            onDelete={handleDelete}
            onEdit={setSelectedUser}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
