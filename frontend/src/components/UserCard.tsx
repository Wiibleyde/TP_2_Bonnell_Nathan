import type { User } from '../types';

interface UserCardProps {
    user: User;
    onDelete: (id: string) => void;
    onEdit: (user: User) => void;
}

function UserCard({ user, onDelete, onEdit }: UserCardProps) {
    const formattedDate = new Date(user.createdAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const isAdmin = user.role === 'admin';

    return (
        <div style={{
            border: `1px solid ${isAdmin ? '#a78bfa44' : '#1e3a5f'}`,
            borderTop: `2px solid ${isAdmin ? '#a78bfa' : '#00d4ff'}`,
            borderRadius: '6px',
            boxShadow: isAdmin
                ? '0 4px 24px rgba(167,139,250,0.1)'
                : '0 4px 24px rgba(0,212,255,0.07)',
            padding: '18px',
            width: '300px',
            backgroundColor: '#111827',
            fontFamily: "'JetBrains Mono', monospace",
            position: 'relative',
            transition: 'box-shadow 0.2s',
        }}>
            <div style={{ marginBottom: '10px' }}>
                <span style={{
                    display: 'inline-block',
                    padding: '2px 10px',
                    borderRadius: '3px',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    backgroundColor: isAdmin ? 'rgba(167,139,250,0.12)' : 'rgba(0,255,157,0.1)',
                    color: isAdmin ? '#a78bfa' : '#00ff9d',
                    border: `1px solid ${isAdmin ? '#a78bfa55' : '#00ff9d55'}`,
                    textTransform: 'uppercase',
                }}>
                    {user.role}
                </span>
            </div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: '#e2e8f0', fontWeight: 600 }}>
                {user.name}
            </h3>
            <p style={{ margin: '4px 0', fontSize: '0.82rem', color: '#00d4ff', letterSpacing: '0.02em' }}>
                {user.email}
            </p>
            <p style={{ margin: '10px 0 0 0', fontSize: '0.75rem', color: '#4a5568', letterSpacing: '0.03em' }}>
                CRÉÉ {formattedDate.toUpperCase()}
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                <button
                    onClick={() => onEdit(user)}
                    style={{
                        padding: '6px 14px',
                        backgroundColor: 'transparent',
                        color: '#00d4ff',
                        border: '1px solid #00d4ff55',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.78rem',
                        letterSpacing: '0.08em',
                        fontFamily: "'JetBrains Mono', monospace",
                        transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.12)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                    [ MODIFIER ]
                </button>
                <button
                    onClick={() => onDelete(user._id)}
                    style={{
                        padding: '6px 14px',
                        backgroundColor: 'transparent',
                        color: '#ff3b5c',
                        border: '1px solid #ff3b5c55',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.78rem',
                        letterSpacing: '0.08em',
                        fontFamily: "'JetBrains Mono', monospace",
                        transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,59,92,0.12)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                    [ SUPPRIMER ]
                </button>
            </div>
        </div>
    );
}

export default UserCard;
