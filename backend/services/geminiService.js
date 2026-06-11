const { GoogleGenerativeAI } = require("@google/generative-ai");

const generatePromptResponse = async (promptText) => {
    try {
        // Resolve the key dynamically on execution to prevent caching undefined
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not configured in the backend environment variables. Please add it to your .env file.");
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        
        // Using gemini-2.5-flash as it is active and supported in this environment
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(promptText);
        const response = await result.response;
        
        return response.text();
    } catch (error) {
        console.error("Gemini service error:", error);
        throw error;
    }
};

module.exports = { generatePromptResponse };
