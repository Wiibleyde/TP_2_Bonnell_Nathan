import { useState } from 'react';

interface UserFormData {
    name: string;
    email: string;
    role: 'user' | 'admin';
}

interface UserFormProps {
    onSubmit: (formData: UserFormData) => void;
}

const initialState: UserFormData = { name: '', email: '', role: 'user' };

function UserForm({ onSubmit }: UserFormProps) {
    const [formData, setFormData] = useState<UserFormData>(initialState);
    const [validationError, setValidationError] = useState<string | null>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim()) {
            setValidationError('Le nom et l\'email sont requis.');
            return;
        }

        setValidationError(null);
        onSubmit(formData);
        setFormData(initialState);
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                maxWidth: '380px',
                border: '1px solid #1e3a5f',
                borderTop: '2px solid #00d4ff',
                borderRadius: '6px',
                padding: '24px',
                boxShadow: '0 4px 32px rgba(0,212,255,0.07)',
                backgroundColor: '#111827',
                fontFamily: "'JetBrains Mono', monospace",
            }}
        >
            <h3 style={{ margin: '0 0 4px 0', fontSize: '0.85rem', letterSpacing: '0.12em', color: '#00d4ff', textTransform: 'uppercase' }}>
                // CRÉER UN UTILISATEUR
            </h3>

            {validationError && (
                <p style={{ color: '#ff3b5c', margin: 0, fontSize: '0.78rem', letterSpacing: '0.05em' }}>
                    ! {validationError}
                </p>
            )}

            <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.75rem', letterSpacing: '0.08em', color: '#94a3b8', textTransform: 'uppercase' }}>
                Nom
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    style={inputStyle}
                />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.75rem', letterSpacing: '0.08em', color: '#94a3b8', textTransform: 'uppercase' }}>
                Email
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jean@example.com"
                    style={inputStyle}
                />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.75rem', letterSpacing: '0.08em', color: '#94a3b8', textTransform: 'uppercase' }}>
                Rôle
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                </select>
            </label>

            <button
                type="submit"
                style={{
                    marginTop: '4px',
                    padding: '9px 18px',
                    backgroundColor: 'transparent',
                    color: '#00d4ff',
                    border: '1px solid #00d4ff',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    letterSpacing: '0.12em',
                    fontFamily: "'JetBrains Mono', monospace",
                    textTransform: 'uppercase',
                    transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,212,255,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
                [ CRÉER ]
            </button>
        </form>
    );
}

const inputStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #1e3a5f',
    backgroundColor: '#0a0e1a',
    color: '#e2e8f0',
    fontSize: '0.85rem',
    fontFamily: "'JetBrains Mono', monospace",
    outline: 'none',
};

export default UserForm;
