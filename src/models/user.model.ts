const users: User[] = [
    {
        id: 1,
        name: 'Nathan Bonnell',
        email: 'nathan@bonnell.fr',
        role: 'admin',
        createdAt: new Date()
    },
    {
        id: 2,
        name: 'Mathéo Lang',
        email: 'matheo.lang@icloud.com',
        role: 'user',
        createdAt: new Date()
    },
    {
        id: 3,
        name: 'Lukas Portier',
        email: 'JSPASON@EMAIL.ALED',
        role: 'user',
        createdAt: new Date()
    }
];

const getNextUserId = (): number => {
    if (users.length === 0) return 1;
    return Math.max(...users.map(u => u.id)) + 1;
};

export const isValidRole = (role: unknown): role is User['role'] =>
    role === 'admin' || role === 'user';

export const findAll = (role?: User['role']): User[] =>
    role ? users.filter(u => u.role === role) : [...users];

export const findById = (id: number): User | undefined =>
    users.find(u => u.id === id);

export const emailExists = (email: string, excludeId?: number): boolean =>
    users.some(u => u.email === email && u.id !== excludeId);

export const create = (data: Omit<User, 'id' | 'createdAt'>): User => {
    const newUser: User = { id: getNextUserId(), ...data, createdAt: new Date() };
    users.push(newUser);
    return newUser;
};

export const update = (id: number, data: Partial<Pick<User, 'name' | 'email' | 'role'>>): User | null => {
    const user = users.find(u => u.id === id);
    if (!user) return null;
    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email;
    if (data.role) user.role = data.role;
    return user;
};

export const remove = (id: number): boolean => {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
};
