const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/userModel.js');

const giveCredits = async () => {
    try {
        const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/prompt_marketplace';
        await mongoose.connect(uri);
        console.log("Connected to MongoDB!");

        // Find the user (Abhishek Anand)
        const email = "abhishek1232455@gmail.com";
        const user = await User.findOne({ email });

        if (!user) {
            console.log(`User with email ${email} not found.`);
            process.exit(1);
        }

        user.userCredits = 100;
        await user.save();

        console.log(`Successfully granted 100 credits to ${user.firstName} ${user.lastName}!`);
        console.log(`New balance: ${user.userCredits} credits.`);
        process.exit(0);
    } catch (err) {
        console.error("Error giving credits:", err);
        process.exit(1);
    }
};

giveCredits();
