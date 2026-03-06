interface NavbarProps {
    count: number;
}

function Navbar({ count }: NavbarProps) {
    return (
        <nav style={{
            backgroundColor: '#0a0e1a',
            borderBottom: '1px solid #1e3a5f',
            boxShadow: '0 1px 0 #00d4ff22, 0 4px 24px rgba(0,0,0,0.6)',
            color: '#e2e8f0',
            padding: '14px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: "'JetBrains Mono', monospace",
        }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                    color: '#00d4ff',
                    fontWeight: 700,
                    fontSize: '1.15rem',
                    letterSpacing: '0.08em',
                    textShadow: '0 0 12px rgba(0,212,255,0.7)',
                }}>{'>'}</span>
                <span style={{ fontWeight: 600, fontSize: '1rem', letterSpacing: '0.05em' }}>
                    GESTION<span style={{ color: '#00d4ff' }}>_</span>UTILISATEURS
                </span>
            </span>
            <span style={{
                fontSize: '0.8rem',
                color: '#00d4ff',
                border: '1px solid #1e3a5f',
                borderRadius: '4px',
                padding: '3px 10px',
                letterSpacing: '0.05em',
                background: 'rgba(0,212,255,0.05)',
            }}>
                {String(count).padStart(2, '0')} USER{count !== 1 ? 'S' : ''}
            </span>
        </nav>
    );
}

export default Navbar;
