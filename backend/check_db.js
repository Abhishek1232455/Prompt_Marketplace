const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/prompt_marketplace';
        console.log("Connecting to:", uri);
        await mongoose.connect(uri);
        console.log("Connected successfully!");

        // Query users
        const db = mongoose.connection.db;
        const users = await db.collection('users').find({}).toArray();
        console.log("Users in DB:");
        users.forEach(u => {
            console.log(`- User: ${u.firstName} ${u.lastName} (${u.email})`);
            console.log(`  ID: ${u._id}`);
            console.log(`  Credits: ${u.userCredits}`);
            console.log(`  Prompts array:`, u.prompts);
        });

        // Query prompts
        const prompts = await db.collection('prompts').find({}).toArray();
        console.log("\nPrompts in DB:");
        prompts.forEach(p => {
            console.log(`- Prompt ID: ${p._id} | Name: ${p.name}`);
        });

        process.exit(0);
    } catch (err) {
        console.error("Database check error:", err);
        process.exit(1);
    }
};

connectDB();
