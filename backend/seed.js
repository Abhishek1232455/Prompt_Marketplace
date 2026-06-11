const mongoose = require('mongoose');
const CryptoJS = require("crypto-js");
const dotenv = require('dotenv');
dotenv.config();

const Prompt = require('./models/promptModel.js');

const PROMPT_KEY = process.env.PROMPT_KEY || 'secret';

const encryptPrompt = (text) => {
    return CryptoJS.AES.encrypt(text, PROMPT_KEY).toString();
};

const samplePrompts = [
    {
        name: "Expert Code Refactorer",
        price: 20,
        category: "Chatgpt",
        imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80",
        promptDescription: "A highly specialized prompt to convert spaghetti code into clean, scalable, and optimized code following SOLID principles and design patterns.",
        promptData: encryptPrompt("Act as an expert software architect. Review the following code and refactor it for clean code, readability, performance, and SOLID principles. Explain your changes: [YourCodeHere]")
    },
    {
        name: "UX/UI Design Critic",
        price: 15,
        category: "Chatgpt",
        imageUrl: "https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Provides detailed structural feedback and critique on layout, typography, colors, and accessibility for any digital user experience design.",
        promptData: encryptPrompt("Analyze the following UI copy and layout description. Provide a critical critique on user experience, visual hierarchy, alignment, contrast, and cognitive load: [DesignDetails]")
    },
    {
        name: "3D Cyberpunk Streetscape",
        price: 35,
        category: "MidJourney",
        imageUrl: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Produces stunning, ultra-realistic 3D rendering cyberpunk city streets with neon light reflections, rain puddles, and cinematic atmosphere.",
        promptData: encryptPrompt("A cinematic 3D render of a futuristic cyberpunk street in Neo-Tokyo, rainy night, glowing neon signs reflecting in puddles, photorealistic, octane render, unreal engine 5, 8k resolution, aspect ratio 16:9 --v 6.0")
    },
    {
        name: "Watercolor Portrait Generator",
        price: 30,
        category: "MidJourney",
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80",
        promptDescription: "A beautiful, organic watercolor art prompt for producing expressive portraits of people or animals.",
        promptData: encryptPrompt("An artistic watercolor portrait of [subject], vibrant color splashes, dripping paint effect, white background, expressive, highly detailed, style of Agnes Cecile --v 6.0")
    },
    {
        name: "Minimalist Vector Logo Maker",
        price: 25,
        category: "DALL-E",
        imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
        promptDescription: "A reliable DALL-E prompt to generate flat, modern, minimalist vector-style logo concepts for any brand name.",
        promptData: encryptPrompt("A flat, minimalist vector logo design for a [brand_type] company named [brand_name], modern shapes, simple color palette, white background, no gradients, clean lines, high contrast")
    },
    {
        name: "TypeScript Algorithm Solver",
        price: 15,
        category: "GitHub Copilot",
        imageUrl: "https://images.unsplash.com/photo-1516116211223-5c359a36298a?auto=format&fit=crop&w=600&q=80",
        promptDescription: "An efficient Copilot code comment template to prompt the compiler to generate clean, typed, and unit-tested algorithm implementations.",
        promptData: encryptPrompt("// Write a highly optimized TypeScript function to solve [algorithm_name]. Ensure O([time_complexity]) time complexity, handle edge cases, and add type safety interfaces: ")
    },
    {
        name: "High-Converting Ad Copy",
        price: 10,
        category: "Copyai",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate persuasive social media ad copywriting utilizing AIDA (Attention, Interest, Desire, Action) framework.",
        promptData: encryptPrompt("Write a Facebook ad copy for a product named [product_name] that solves the problem of [customer_problem]. Follow AIDA framework, speak to [target_audience], and end with a strong call-to-action.")
    },
    {
        name: "SEO Blog Outline Creator",
        price: 15,
        category: "Bard AI",
        imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Automatically structures a comprehensive, SEO-optimized outline for a blog post based on target keywords.",
        promptData: encryptPrompt("Create a detailed, SEO-friendly blog post outline for the topic '[blog_topic]'. Include proposed H2s, H3s, target keywords to integrate: [keywords], and a summary of search intent.")
    }
];

const seedDB = async () => {
    try {
        const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/prompt_marketplace';
        console.log("Connecting to Database for seeding...");
        await mongoose.connect(uri);
        console.log("Connected successfully!");

        // Clear existing prompts to avoid duplicates
        console.log("Clearing existing prompts...");
        await Prompt.deleteMany({});

        // Insert seed prompts
        console.log("Inserting sample prompts...");
        await Prompt.insertMany(samplePrompts);
        
        console.log("Database seeded successfully! 🌱");
        process.exit(0);
    } catch (err) {
        console.error("Database seeding failed:", err);
        process.exit(1);
    }
};

seedDB();
