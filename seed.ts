import mongoose from 'mongoose';
import UserModel from './src/models/user.model.ts';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tp_seance3';

const seedUsers = [
    {
        name: 'Nathan Bonnell',
        email: 'nathan@bonnell.fr',
        role: 'admin' as const
    },
    {
        name: 'Mathéo Lang',
        email: 'matheo.lang@icloud.com',
        role: 'user' as const
    },
    {
        name: 'Lukas Portier',
        email: 'lukas.portier@email.com',
        role: 'user' as const
    }
];

async function seed() {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await UserModel.deleteMany({});
    console.log('Cleared existing users');

    const created = await UserModel.insertMany(seedUsers);
    console.log(`Seeded ${created.length} users:`);
    created.forEach(u => console.log(` - [${u._id}] ${u.name} (${u.role})`));

    await mongoose.disconnect();
    console.log('Done');
}

seed().catch(err => {
    console.error('Seed failed:', err);
    process.exit(1);
});
