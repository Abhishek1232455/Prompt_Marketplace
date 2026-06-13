const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("Please configure GEMINI_API_KEY in your .env file.");
    process.exit(1);
}

const checkModels = async () => {
    try {
        console.log("Listing available models from Gemini API...\n");
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            console.error("❌ API returned an error:", JSON.stringify(data.error, null, 2));
            return;
        }

        console.log("✅ API call succeeded! Available models:");
        if (data.models && data.models.length > 0) {
            data.models.forEach(model => {
                console.log(`- ${model.name} (${model.displayName})`);
                console.log(`  Supported actions:`, model.supportedGenerationMethods);
            });
        } else {
            console.log("No models returned in the list.");
        }
    } catch (err) {
        console.error("❌ Network or fetch error:", err.message);
    }
};

checkModels();
