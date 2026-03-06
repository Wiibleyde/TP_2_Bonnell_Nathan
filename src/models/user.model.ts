import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    role: 'admin' | 'user';
    createdAt: Date;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// TypeScript equivalent of: module.exports = mongoose.model('User', userSchema)
const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;

export const isValidRole = (role: unknown): role is User['role'] =>
    role === 'admin' || role === 'user';

export const findAll = async (role?: User['role']): Promise<User[]> => {
    const query = role ? { role } : {};
    const users = await UserModel.find(query).lean();
    return users.map(u => ({
        _id: u._id.toString(),
        name: u.name,
        email: u.email,
        role: u.role as User['role'],
        createdAt: u.createdAt
    }));
};

export type PaginatedUsersResult = {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    data: User[];
};

export const findAllPaginated = async (
    page: number,
    limit: number,
    role?: User['role'],
    search?: string
): Promise<PaginatedUsersResult> => {
    const query: Record<string, unknown> = {};

    if (role) {
        query['role'] = role;
    }

    if (search) {
        query['name'] = new RegExp(search, 'i');
    }

    const skip = (page - 1) * limit;

    const [users, totalCount] = await Promise.all([
        UserModel.find(query).skip(skip).limit(limit).lean(),
        UserModel.countDocuments(query)
    ]);

    const data = users.map(u => ({
        _id: u._id.toString(),
        name: u.name,
        email: u.email,
        role: u.role as User['role'],
        createdAt: u.createdAt
    }));

    return {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        data
    };
};

export const findById = async (id: string): Promise<User | null> => {
    const user = await UserModel.findById(id).lean();
    if (!user) return null;
    return {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role as User['role'],
        createdAt: user.createdAt
    };
};

export const emailExists = async (email: string, excludeId?: string): Promise<boolean> => {
    const query: Record<string, unknown> = { email: email.toLowerCase() };
    if (excludeId) query['_id'] = { $ne: excludeId };
    const user = await UserModel.findOne(query);
    return user !== null;
};

export const create = async (data: Omit<User, '_id' | 'createdAt'>): Promise<User> => {
    const newUser = await UserModel.create(data);
    return {
        _id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt
    };
}

export const update = async (id: string, data: Partial<Pick<User, 'name' | 'email' | 'role'>>): Promise<User | null> => {
    const user = await UserModel.findByIdAndUpdate(id, data, { returnDocument: 'after' }).lean();
    if (!user) return null;
    return {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role as User['role'],
        createdAt: user.createdAt
    };
};

export const remove = async (id: string): Promise<boolean> => {
    const result = await UserModel.findByIdAndDelete(id);
    return result !== null;
};
