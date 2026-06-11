const Prompt = require('../models/promptModel.js');
const CryptoJS = require("crypto-js");

const uploadPromptController = async (req, res) => {
    try {
        const { name, price, category, imageUrl, promptDescription, promptData } = req.body;

        // Ensure all required fields are present
        if (!name || !price || !category || !imageUrl || !promptDescription || !promptData) {
            return res.status(400).send({
                success: false,
                message: "Please fill out all required fields, including the uploaded image.",
            });
        }

        const key = process.env.PROMPT_KEY;
        let encrypted = CryptoJS.AES.encrypt(promptData, key).toString();

        const newPromptData = {
            name,
            price: Number(price),
            category,
            imageUrl,
            promptDescription,
            promptData: encrypted
        };

        const prompt = new Prompt(newPromptData);
        await prompt.save();
        
        return res.status(201).send({
            success: true,
            message: "Prompt Submitted Successfully 👍!",
            prompt,
        });
    } catch (error) {
        console.error("Error in uploadPromptController:", error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error while submitting prompt",
            error: error.message
        });
    }
}

module.exports = { uploadPromptController };