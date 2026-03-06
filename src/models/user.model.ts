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
    try {
        const query = role ? { role } : {};
        const users = await UserModel.find(query).lean();
        return users.map(u => ({
            _id: u._id.toString(),
            name: u.name,
            email: u.email,
            role: u.role as User['role'],
            createdAt: u.createdAt
        }));
    } catch (error) {
        return [];
    }
};

export const findById = async (id: string): Promise<User | null> => {
    try {
        const user = await UserModel.findById(id).lean();
        if (!user) return null;
        return {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role as User['role'],
            createdAt: user.createdAt
        };
    } catch (error) {
        return null;
    }
};

export const emailExists = async (email: string, excludeId?: string): Promise<boolean> => {
    try {
        const query: Record<string, unknown> = { email: email.toLowerCase() };
        if (excludeId) query['_id'] = { $ne: excludeId };
        const user = await UserModel.findOne(query);
        return user !== null;
    } catch (error) {
        return false;
    }
};

export const create = async (data: Omit<User, '_id' | 'createdAt'>): Promise<User> => {
    try {
        const newUser = await UserModel.create(data);
        return {
            _id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            createdAt: newUser.createdAt
        };
    } catch (error) {
        throw error;
    }
}

export const update = async (id: string, data: Partial<Pick<User, 'name' | 'email' | 'role'>>): Promise<User | null> => {
    try {
        const user = await UserModel.findByIdAndUpdate(id, data, { returnDocument: 'after' }).lean();
        if (!user) return null;
        return {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role as User['role'],
            createdAt: user.createdAt
        };
    } catch (error) {
        return null;
    }
};

export const remove = async (id: string): Promise<boolean> => {
    try {
        const result = await UserModel.findByIdAndDelete(id);
        return result !== null;
    } catch (error) {
        return false;
    }
};
