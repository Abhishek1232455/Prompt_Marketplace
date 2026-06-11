const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("Please configure GEMINI_API_KEY in your .env file.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const testModel = async (modelName) => {
    try {
        console.log(`Testing model: ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Respond with the word 'Success'.");
        const response = await result.response;
        console.log(`✅ ${modelName} succeeded! Response: ${response.text().trim()}`);
        return true;
    } catch (err) {
        console.log(`❌ ${modelName} failed. Error: ${err.message}`);
        return false;
    }
};

const runTests = async () => {
    console.log("Starting Gemini model diagnostics...\n");
    await testModel("gemini-2.5-flash");
    await testModel("gemini-2.0-flash");
    await testModel("gemini-flash-latest");
    process.exit(0);
};

runTests();
