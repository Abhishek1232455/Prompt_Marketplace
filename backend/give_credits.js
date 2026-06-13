const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/userModel.js');

const giveCredits = async () => {
    try {
        const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/prompt_marketplace';
        await mongoose.connect(uri);
        console.log("Connected to MongoDB!");

        // Find the user (default to your email or command argument)
        const email = process.argv[2] || "abhishek1232455@gmail.com";
        let user = await User.findOne({ email });

        if (!user) {
            // Fallback: use first user found in database
            user = await User.findOne({});
            if (!user) {
                console.log("No registered users found. Please create an account in the web UI first!");
                process.exit(1);
            }
            console.log(`Email "${email}" not found. Falling back to first user: ${user.email}`);
        }

        const credits = Number(process.argv[3]) || 500;
        user.userCredits = credits;
        await user.save();

        console.log(`Successfully granted ${credits} credits to ${user.firstName} ${user.lastName} (${user.email})!`);
        console.log(`New balance: ${user.userCredits} credits.`);
        process.exit(0);
    } catch (err) {
        console.error("Error giving credits:", err);
        process.exit(1);
    }
};

giveCredits();
