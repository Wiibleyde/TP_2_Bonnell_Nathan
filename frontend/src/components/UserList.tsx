import type { User } from '../types';
import UserCard from './UserCard';

interface UserListProps {
    users: User[];
    loading: boolean;
    error: string | null;
    onDelete: (id: string) => void;
    onEdit: (user: User) => void;
}

function UserList({ users, loading, error, onDelete, onEdit }: UserListProps) {
    if (loading) {
        return <p style={{ textAlign: 'center', color: '#00d4ff', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>// CHARGEMENT...</p>;
    }

    if (error) {
        return <p style={{ textAlign: 'center', color: '#ff3b5c', fontFamily: "'JetBrains Mono', monospace" }}>! {error}</p>;
    }

    if (users.length === 0) {
        return <p style={{ textAlign: 'center', color: '#4a5568', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>// AUCUN UTILISATEUR</p>;
    }

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'flex-start',
        }}>
            {users.map((user) => (
                <UserCard key={user._id} user={user} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </div>
    );
}

export default UserList;
