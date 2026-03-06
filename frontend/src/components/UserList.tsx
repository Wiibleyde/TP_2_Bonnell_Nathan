import type { User } from '../types';
import UserCard from './UserCard';

type FilterRole = 'all' | 'admin' | 'user';

interface UserListProps {
    users: User[];
    loading: boolean;
    error: string | null;
    onDelete: (id: string) => void;
    onEdit: (user: User) => void;
    filterRole: FilterRole;
    onFilterChange: (role: FilterRole) => void;
}

const filters: { label: string; value: FilterRole }[] = [
    { label: 'Tous', value: 'all' },
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
];

function UserList({ users, loading, error, onDelete, onEdit, filterRole, onFilterChange }: UserListProps) {
    if (loading) {
        return <p style={{ textAlign: 'center', color: '#00d4ff', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>// CHARGEMENT...</p>;
    }

    if (error) {
        return <p style={{ textAlign: 'center', color: '#ff3b5c', fontFamily: "'JetBrains Mono', monospace" }}>! {error}</p>;
    }

    const filtered = filterRole === 'all' ? users : users.filter((u) => u.role === filterRole);

    return (
        <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                {filters.map(({ label, value }) => {
                    const active = filterRole === value;
                    return (
                        <button
                            key={value}
                            onClick={() => onFilterChange(value)}
                            style={{
                                padding: '6px 16px',
                                backgroundColor: active ? 'rgba(0,212,255,0.12)' : 'transparent',
                                color: active ? '#00d4ff' : '#94a3b8',
                                border: `1px solid ${active ? '#00d4ff' : '#1e3a5f'}`,
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 700,
                                fontSize: '0.75rem',
                                letterSpacing: '0.1em',
                                fontFamily: "'JetBrains Mono', monospace",
                                textTransform: 'uppercase',
                                transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                            }}
                        >
                            [ {label} ]
                        </button>
                    );
                })}
            </div>
            {filtered.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#4a5568', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>// AUCUN UTILISATEUR</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'flex-start' }}>
                    {filtered.map((user) => (
                        <UserCard key={user._id} user={user} onDelete={onDelete} onEdit={onEdit} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserList;
