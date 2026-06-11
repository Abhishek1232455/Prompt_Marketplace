const Prompt = require('../models/promptModel.js');
const User = require('../models/userModel.js');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const { generatePromptResponse } = require('../services/geminiService.js');

const getAllPrompts = async (req, res) => {
    try {
        let prompts = await Prompt
            .find({})
            .sort({ createdAt: -1 });

        return res.status(200).send({
            success: true,
            message: "get all prompt successfully",
            prompts,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error fetching prompts",
            error
        });
    }
}

const getPromptData = async (req, res) => {
    try {
        const id = req.params.id;
        const prompt = await Prompt.findById(id);

        if (!prompt) {
            return res.status(404).send({
                success: false,
                message: "Prompt not found"
            });
        }

        let userId = null;
        // Resolve user authentication state securely via JWT token
        const authHeader = req.headers["authorization"];
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.userId;
            } catch (err) {
                console.log("JWT Verification error in getPromptData:", err.message);
            }
        }

        let isPurchased = false;
        if (userId) {
            const user = await User.findById(userId);
            if (user && user.prompts.includes(String(prompt._id))) {
                isPurchased = true;
            }
        }

        if (isPurchased) {
            const key = process.env.PROMPT_KEY;
            var bytes = CryptoJS.AES.decrypt(prompt.promptData, key);
            var originalPrompt = bytes.toString(CryptoJS.enc.Utf8);
            prompt.promptData = originalPrompt;
        } else {
            if (!userId) {
                prompt.promptData = "Login To access";
            } else {
                prompt.promptData = "Unauthorized";
            }
        }

        return res.status(200).send({
            success: true,
            message: "get prompt successfully",
            prompt,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error fetching prompt details",
            error
        });
    }
}

const userPrompts = async (req, res) => {
    try {
        const existingUser = await User.findOne({ _id: req.body.userId });
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        const userPromptsIds = existingUser.prompts || [];

        // Find prompts with _id in the user's prompts array
        const userPrompts = await Prompt.find({ _id: { $in: userPromptsIds } }).sort({ updatedAt: -1 });
        return res.status(200).send({
            success: true,
            message: "get current user prompts successfully",
            userPrompts,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error fetching user prompts",
            error
        });
    }
}

const executePrompt = async (req, res) => {
    try {
        const id = req.params.id;
        const prompt = await Prompt.findById(id);

        if (!prompt) {
            return res.status(404).send({
                success: false,
                message: "Prompt not found"
            });
        }

        const user = await User.findById(req.body.userId);
        if (!user || !user.prompts.includes(String(prompt._id))) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized: You must purchase this prompt to execute it."
            });
        }

        // Decrypt prompt template
        const key = process.env.PROMPT_KEY;
        const bytes = CryptoJS.AES.decrypt(prompt.promptData, key);
        const originalPrompt = bytes.toString(CryptoJS.enc.Utf8);

        // Substitute variables in the format [VariableName] or {VariableName}
        let executedPromptText = originalPrompt;
        const variables = req.body.variables || {};
        for (const key of Object.keys(variables)) {
            const value = variables[key] || "";
            const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const regex = new RegExp(`\\[${escapedKey}\\]|\\{${escapedKey}\\}`, 'g');
            executedPromptText = executedPromptText.replace(regex, value);
        }

        // Call Gemini Service
        const aiResponse = await generatePromptResponse(executedPromptText);

        return res.status(200).send({
            success: true,
            message: "Prompt executed successfully",
            response: aiResponse,
            executedPrompt: executedPromptText
        });
    } catch (error) {
        console.error("Error executing prompt:", error);
        return res.status(500).send({
            success: false,
            message: error.message || "Error executing prompt with Gemini API",
            error: error.message
        });
    }
}

module.exports = { getAllPrompts, getPromptData, userPrompts, executePrompt };