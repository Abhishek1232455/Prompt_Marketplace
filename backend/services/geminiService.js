const { GoogleGenerativeAI } = require("@google/generative-ai");

// Retrieve Gemini API Key from environment variables
const apiKey = process.env.GEMINI_API_KEY;

let genAI = null;
if (apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
}

const generatePromptResponse = async (promptText) => {
    try {
        if (!apiKey || !genAI) {
            throw new Error("GEMINI_API_KEY is not configured in the backend environment variables. Please add it to your .env file.");
        }

        // Using gemini-1.5-flash as it is highly performant, low latency, and robust
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(promptText);
        const response = await result.response;
        
        return response.text();
    } catch (error) {
        console.error("Gemini service error:", error);
        throw error;
    }
};

module.exports = { generatePromptResponse };
