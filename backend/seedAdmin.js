import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from './models/User.js';
import { connectDB } from './config/db.js';

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        const name = process.env.ADMIN_NAME;

        let adminUser = await User.findOne({ email });
        if (!adminUser) {
            adminUser = new User({
                name,
                email,
                password,
                role: "admin",
            });
            await adminUser.save();
            console.log('Admin user created successfully.');
        } else {
            console.log('Admin user already exists.');
        }
        await mongoose.connection.close();
        process.exit(0);

    } catch (error) {
        console.error('Error seeding admin user:', error);;
        process.exit(1);
    }

}

seedAdmin();