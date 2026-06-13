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
    // === CHATGPT CATEGORY (10 Prompts) ===
    {
        name: "Expert Code Refactorer",
        price: 20,
        category: "Chatgpt",
        imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80",
        promptDescription: "A highly specialized prompt to convert spaghetti code into clean, scalable, and optimized code following SOLID principles and design patterns.",
        promptData: encryptPrompt("Act as an expert software architect. Review the following code and refactor it for clean code, readability, performance, and SOLID principles. Explain your changes: [YourCodeHere]")
    },
    {
        name: "Virtual Technical Interviewer",
        price: 25,
        category: "Chatgpt",
        imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Simulate a rigorous technical job interview for software engineer positions with feedback on answers.",
        promptData: encryptPrompt("Act as an interviewer for a [JobRole] position with [Experience] years of experience. Ask me one technical question at a time and evaluate my response critically. Begin by greeting me.")
    },
    {
        name: "Lesson Plan Generator",
        price: 15,
        category: "Chatgpt",
        imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Create structured, interactive, and comprehensive lesson plans for any educational subject.",
        promptData: encryptPrompt("Create a detailed 60-minute lesson plan for teaching [Subject] to [GradeLevel] students. Include learning objectives, materials needed, a warm-up activity, core instruction, and an assessment quiz.")
    },
    {
        name: "Resume & CV Optimizer",
        price: 20,
        category: "Chatgpt",
        imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Tailor your resume bullets to align perfectly with target job descriptions using high-impact action verbs.",
        promptData: encryptPrompt("Review my resume draft and suggest optimizations to align it with this job description: [JobDescription]. Rephrase my achievements to highlight quantifiable results.")
    },
    {
        name: "Youtube Script Writer",
        price: 30,
        category: "Chatgpt",
        imageUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate engaging scripts for YouTube videos, including hooks, body segments, and visual cues.",
        promptData: encryptPrompt("Write an engaging 10-minute YouTube video script about [VideoTopic]. Include a high-retention hook, visual scene directions, body points, and a strong call-to-action to subscribe.")
    },
    {
        name: "Socratic Math Tutor",
        price: 15,
        category: "Chatgpt",
        imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
        promptDescription: "A math tutor that guides you to the correct answer using socratic questioning instead of just giving it away.",
        promptData: encryptPrompt("Act as a Socratic math tutor. Do not give me the answer directly. Help me solve the math problem: [MathProblem] by asking guiding questions and correcting my logic at each step.")
    },
    {
        name: "AI Travel Itinerary Planner",
        price: 25,
        category: "Chatgpt",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Plan custom, localized day-by-day travel itineraries for any city worldwide.",
        promptData: encryptPrompt("Plan a custom day-by-day itinerary for a [Duration] trip to [Destination]. Include recommended hotels, dining spots, local attractions, transit tips, and approximate daily budget.")
    },
    {
        name: "Creative Recipe Builder",
        price: 15,
        category: "Chatgpt",
        imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate delicious, step-by-step cooking recipes using only the ingredients you have in your kitchen.",
        promptData: encryptPrompt("Act as an expert chef. Create a delicious recipe using only these ingredients: [Ingredients]. List prep time, cook time, step-by-step instructions, and potential substitutions.")
    },
    {
        name: "Interactive Debate Coach",
        price: 20,
        category: "Chatgpt",
        imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Hone your public speaking and logical reasoning skills by debating topics with a mock opponent.",
        promptData: encryptPrompt("Act as a formal debate coach. Challenge my stance on the topic '[DebateTopic]'. Give a counter-argument and ask me to defend my position with evidence.")
    },

    // === BARD AI (GEMINI) CATEGORY (10 Prompts) ===
    {
        name: "SEO Outline Architect",
        price: 15,
        category: "Bard AI",
        imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Automatically structures a comprehensive, SEO-optimized outline for a blog post based on target keywords.",
        promptData: encryptPrompt("Create a detailed, SEO-friendly blog post outline for the topic '[BlogTopic]'. Include proposed H2s, H3s, target keywords to integrate: [keywords], and a summary of search intent.")
    },
    {
        name: "SWOT Competitor Analyst",
        price: 20,
        category: "Bard AI",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Analyze any business's competitors and construct a standard SWOT matrix using real-time search capabilities.",
        promptData: encryptPrompt("Perform a SWOT analysis for the company [CompetitorName]. Identify their key strengths, weaknesses, market opportunities, and potential threats based on current market trends.")
    },
    {
        name: "Google Ads Copywriter",
        price: 15,
        category: "Bard AI",
        imageUrl: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Create high-converting copy variants for Google Search Network ad campaigns.",
        promptData: encryptPrompt("Write 3 Google search ad headlines (max 30 chars) and 2 descriptions (max 90 chars) to promote the product [ProductName]. Target audience: [TargetAudience].")
    },
    {
        name: "Market Research Summarizer",
        price: 25,
        category: "Bard AI",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Compile a market research summary sheet containing industry growth stats and key trends.",
        promptData: encryptPrompt("Generate a detailed market research report for the [Industry] sector. Highlight the current market size, expected CAGR, top 3 market drivers, and 3 challenges.")
    },
    {
        name: "Press Release Author",
        price: 20,
        category: "Bard AI",
        imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Draft standard, professional press releases for company milestones and product announcements.",
        promptData: encryptPrompt("Write a formal, corporate press release announcing this event: [CompanyEvent]. Follow the AP style guide, include placeholder quotes for the CEO, and add a boilerplate.")
    },
    {
        name: "Brand Voice Designer",
        price: 20,
        category: "Bard AI",
        imageUrl: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Construct a brand voice style guide including tone pillars, vocabulary guidelines, and do/do-not examples.",
        promptData: encryptPrompt("Create a comprehensive brand voice guide for a company built on these values: [CompanyValues]. Provide 3 tone words, rules for writing copy, and before/after copy refactoring examples.")
    },
    {
        name: "Newsletter Sequence Writer",
        price: 25,
        category: "Bard AI",
        imageUrl: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Draft an engaging welcome email sequence for digital newsletters to maximize click-through rates.",
        promptData: encryptPrompt("Write a 3-part email welcome sequence to promote this offer: [PromoOffer]. Email 1: Welcome & Value hook, Email 2: Social proof story, Email 3: Direct call-to-action.")
    },
    {
        name: "Product Launch Strategist",
        price: 30,
        category: "Bard AI",
        imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Establish a launch timeline and marketing strategy outline for new SaaS or consumer products.",
        promptData: encryptPrompt("Build a 4-week product launch marketing plan for the product: [ProductLaunchDetails]. Include pre-launch teasers, launch day activities, and post-launch follow-ups.")
    },
    {
        name: "Cold Sales Email Writer",
        price: 20,
        category: "Bard AI",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Persuasive cold sales email templates designed to book meetings with decision-makers.",
        promptData: encryptPrompt("Write a highly personalized, short cold sales email pitch to a decision-maker at [TargetCompany]. Offer values around [ProductValueProposition] and end with a soft call-to-action.")
    },
    {
        name: "Feedback Survey Analyst",
        price: 25,
        category: "Bard AI",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Extract major pain points, common themes, and overall sentiment from customer survey datasets.",
        promptData: encryptPrompt("Analyze the following customer survey responses. Categorize the main pain points, calculate positive/negative sentiment trends, and suggest 3 actionable product improvements: [SurveyResponses]")
    },

    // === MIDJOURNEY CATEGORY (10 Prompts) ===
    {
        name: "3D Cyberpunk Streetscape",
        price: 35,
        category: "MidJourney",
        imageUrl: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Produces stunning, ultra-realistic 3D rendering cyberpunk city streets with neon light reflections, rain puddles, and cinematic atmosphere.",
        promptData: encryptPrompt("A cinematic 3D render of a futuristic cyberpunk street in Neo-Tokyo, rainy night, glowing neon signs reflecting in puddles, photorealistic, octane render, unreal engine 5, 8k resolution, aspect ratio 16:9 --v 6.0")
    },
    {
        name: "Watercolor Portrait Artist",
        price: 30,
        category: "MidJourney",
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80",
        promptDescription: "An artistic watercolor portrait prompt for producing expressive portraits of people or animals.",
        promptData: encryptPrompt("An artistic watercolor portrait of [Subject], vibrant color splashes, dripping paint effect, white background, expressive, highly detailed, style of Agnes Cecile --v 6.0")
    },
    {
        name: "Isometric Game Asset Maker",
        price: 25,
        category: "MidJourney",
        imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate clean isometric game graphics suitable for 3D simulation or RPG game environments.",
        promptData: encryptPrompt("Isometric game asset of a [AssetType], flat shading, 3D low poly, white background, clean visual details, stylized render, hyper-detailed, Unity engine style --v 6.0")
    },
    {
        name: "Sticker Vector Art",
        price: 20,
        category: "MidJourney",
        imageUrl: "https://images.unsplash.com/photo-1601987077677-5346c0c57d3f?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Creates cute, die-cut vector stickers of characters or objects with clean white borders.",
        promptData: encryptPrompt("A die-cut cute sticker design of a [StickerSubject], bold outlines, pastel colors, white outline, vector graphic style, high contrast, clean background --v 6.0")
    },
    {
        name: "Cinematic Landscape Photo",
        price: 35,
        category: "MidJourney",
        imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Produce atmospheric, wide-angle landscape photography prints.",
        promptData: encryptPrompt("Cinematic wide-angle photo of [Location], during golden hour, mist rolling over mountains, ultra-detailed, captured on 35mm lens, f/8, photorealistic, National Geographic style --v 6.0")
    },
    {
        name: "Retro Anime Character Designer",
        price: 30,
        category: "MidJourney",
        imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Creates stunning 90s vintage anime styled character concept art sheets.",
        promptData: encryptPrompt("Retro 90s anime style character design of [CharacterTraits], hand-drawn, cell shaded, grain effect, nostalgic aesthetic, character sheet, vintage color grading --v 6.0")
    },
    {
        name: "Surrealism Paint Concept",
        price: 30,
        category: "MidJourney",
        imageUrl: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate dreamlike, surrealist oil painting concepts in the style of Salvador Dali.",
        promptData: encryptPrompt("A surrealist oil painting depicting [SurrealSubject], melting clocks, floating clouds, dreamlike atmosphere, fine art brushstrokes, Salvador Dali style, dramatic lighting --v 6.0")
    },
    {
        name: "Sci-Fi Weapon Blueprint",
        price: 25,
        category: "MidJourney",
        imageUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Produce detailed blueprints and concept layouts for futuristic sci-fi firearms and items.",
        promptData: encryptPrompt("Technical blueprint drawing of a sci-fi [WeaponType], cross-section views, grid paper background, labels, blueprint blueprint design, engineering design schematics --v 6.0")
    },
    {
        name: "Futuristic Architecture Render",
        price: 35,
        category: "MidJourney",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Render gorgeous architectural design concepts showing futuristic, biophilic skyscrapers.",
        promptData: encryptPrompt("A hyper-realistic architectural render of a futuristic [BuildingType] integrated with vertical gardens and waterfalls, sunset lighting, glass and white concrete, octane render, architectural digest style --v 6.0")
    },
    {
        name: "Epic Fantasy Monster Art",
        price: 30,
        category: "MidJourney",
        imageUrl: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Produce terrifying and epic fantasy creature concept designs.",
        promptData: encryptPrompt("Epic fantasy character concept art of a [MonsterDetails], fire eyes, towering height, dark environment, glowing runes, digital painting, style of Hearthstone card art --v 6.0")
    },

    // === COPYAI CATEGORY (10 Prompts) ===
    {
        name: "AIDA Social Media Ad Writer",
        price: 10,
        category: "Copyai",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate persuasive social media ad copywriting utilizing AIDA (Attention, Interest, Desire, Action) framework.",
        promptData: encryptPrompt("Write a Facebook ad copy for a product named [product_name] that solves the problem of [customer_problem]. Follow AIDA framework, speak to [target_audience], and end with a strong call-to-action.")
    },
    {
        name: "High-Converting Headlines",
        price: 10,
        category: "Copyai",
        imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Create 10 click-worthy blog or article headline concepts that maximize click-through rate.",
        promptData: encryptPrompt("Generate 10 headline variations for an article about [ArticleTopic]. Include power words, keep them under 60 characters, and target emotional triggers.")
    },
    {
        name: "Instagram Caption Hook",
        price: 10,
        category: "Copyai",
        imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Write micro-copy Instagram captions that drive comment engagement.",
        promptData: encryptPrompt("Write an Instagram caption for a post displaying [PhotoSubject]. Start with a strong hook, add emojis, write a short narrative, and include 5 relevant hashtags.")
    },
    {
        name: "Meta Description Optimizer",
        price: 10,
        category: "Copyai",
        imageUrl: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate optimized Meta Descriptions to improve search engine result page CTR.",
        promptData: encryptPrompt("Write a meta description (max 155 chars) for a webpage detailing: [WebpageContent]. Include a call-to-action and seamlessly integrate the keyword '[keyword]'.")
    },
    {
        name: "Product Pitch Writer",
        price: 15,
        category: "Copyai",
        imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Create a 30-second elevator pitch targeting prospective venture capital investors.",
        promptData: encryptPrompt("Write a 30-second elevator pitch for a startup that offers [ProductFeatures]. Target audience: VCs. Keep it under 150 words and focus on growth scalability.")
    },
    {
        name: "Newsletter Subject Line Split",
        price: 10,
        category: "Copyai",
        imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate A/B test subject lines for email newsletters to double open rates.",
        promptData: encryptPrompt("Generate 5 A/B test email subject line pairs for a newsletter with this body content: [EmailBody]. Keep them short, intriguing, and compatible with mobile viewports.")
    },
    {
        name: "Value Proposition Builder",
        price: 15,
        category: "Copyai",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Draft a clear, high-impact hero header value proposition for SaaS landing pages.",
        promptData: encryptPrompt("Act as a copywriting genius. Write a clear SaaS landing page headline and sub-headline for a tool that solves [CustomerPainPoint]. Keep the copy simple and benefit-driven.")
    },
    {
        name: "Affiliate Product Reviewer",
        price: 15,
        category: "Copyai",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Draft convincing, objective affiliate marketing product review outlines.",
        promptData: encryptPrompt("Write a comprehensive product review outline for [ProductName]. Include sections for Introduction, Key Features, Pros: [ProductPros], Cons: [ProductCons], and a final Buying Recommendation.")
    },
    {
        name: "Persuasive Storyteller Copy",
        price: 15,
        category: "Copyai",
        imageUrl: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Write brand landing page stories that connect emotionally with readers.",
        promptData: encryptPrompt("Translate this dry business timeline into an emotional, storytelling brand copy: [BrandStory]. Focus on the founder's struggle, the 'aha' moment, and customer-centric mission.")
    },
    {
        name: "Call to Action Builder",
        price: 10,
        category: "Copyai",
        imageUrl: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Create 5 copy concepts for landing page signup buttons.",
        promptData: encryptPrompt("Write 5 high-impact, click-inducing button copies for a website trying to get users to: [DesireAction]. Avoid boring copy like 'Submit' or 'Register'.")
    },

    // === BING CHAT CATEGORY (10 Prompts) ===
    {
        name: "Web Resource Fact-Checker",
        price: 15,
        category: "Bing Chat",
        imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Verify web statements and check for logical fallacies or fake news.",
        promptData: encryptPrompt("Fact-check the following claim using web search: [ClaimText]. List 3 credible sources that verify or debunk it, and note any bias in the reporting.")
    },
    {
        name: "Academic Source Finder",
        price: 15,
        category: "Bing Chat",
        imageUrl: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Find peer-reviewed papers and research data on any scientific or academic topic.",
        promptData: encryptPrompt("Find 5 peer-reviewed academic papers published in the last 3 years on [ResearchTopic]. Provide their titles, summaries of findings, and citation links.")
    },
    {
        name: "Comparative Shopping Guide",
        price: 20,
        category: "Bing Chat",
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Compare pricing and features of similar products across the web.",
        promptData: encryptPrompt("Research and compare these products: [ProductCompare]. Create a markdown table comparison of pricing, pros, cons, and user ratings from Amazon and Reddit.")
    },
    {
        name: "Local Restaurant Guide",
        price: 15,
        category: "Bing Chat",
        imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Locate highly-rated hidden gem dining spots in any city based on local blogs.",
        promptData: encryptPrompt("Search for the top 5 'hidden gem' local restaurants in [CityName]. Exclude tourist traps. Provide their cuisine style, signature dish, price level, and average Yelp rating.")
    },
    {
        name: "Budget Travel Estimator",
        price: 20,
        category: "Bing Chat",
        imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate approximate travel cost estimations for lodging, food, and transit in any city.",
        promptData: encryptPrompt("Research the average current travel costs for [DestinationCity]. Provide cost ranges for mid-range hotels, public transit, daily food, and 3 popular museums.")
    },
    {
        name: "Tech Product Specs Compare",
        price: 20,
        category: "Bing Chat",
        imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Side-by-side spec comparison of hardware gadgets and computers.",
        promptData: encryptPrompt("Compare the hardware specifications of [Gadget1] and [Gadget2]. Which device has better battery efficiency, processor performance, and value for price?")
    },
    {
        name: "Current Events News Summarizer",
        price: 15,
        category: "Bing Chat",
        imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Summarize major breaking news stories based on multiple diverse journalistic outlets.",
        promptData: encryptPrompt("Summarize the current breaking news on [NewsTopic] using recent articles from 3 different mainstream publications. Highlight the consensus facts and different viewpoints.")
    },
    {
        name: "Legal Document Analyzer",
        price: 25,
        category: "Bing Chat",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Simplify legal jargon in user agreements or service contracts.",
        promptData: encryptPrompt("Analyze this legal agreement template for [DocumentType]. Highlight the 3 most important clauses, potential liabilities for the signee, and red-flag vocabulary.")
    },
    {
        name: "Historical Timeline Builder",
        price: 15,
        category: "Bing Chat",
        imageUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Build chronological outlines of complex historical events.",
        promptData: encryptPrompt("Create a chronological timeline of key events during '[HistoricalEvent]'. List dates, key figures involved, and brief historical outcomes of each milestone.")
    },
    {
        name: "Book Recommendation Engine",
        price: 15,
        category: "Bing Chat",
        imageUrl: "https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Find tailored book recommendations based on your favorite reads.",
        promptData: encryptPrompt("Recommend 5 fiction books similar in writing style and thematic depth to my favorites: [FavoriteBooks]. Explain why I would enjoy each recommendation.")
    },

    // === DALL-E CATEGORY (10 Prompts) ===
    {
        name: "Flat Vector App Icon",
        price: 25,
        category: "DALL-E",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate modern, flat, vector-styled mobile application icons.",
        promptData: encryptPrompt("A flat vector app icon of [IconSubject], minimalist aesthetic, gradient background, soft shadow, iOS app store icon template style, high contrast, clean details")
    },
    {
        name: "Claymation Character Concept",
        price: 30,
        category: "DALL-E",
        imageUrl: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate cute, plasticine clay stop-motion character concepts.",
        promptData: encryptPrompt("A cute claymation character of a [CharacterRole], detailed plasticine clay textures, tiny fingerprints on surface, studio lighting, solid color background, stop motion film style")
    },
    {
        name: "Futuristic Wearable Gadget",
        price: 25,
        category: "DALL-E",
        imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Design high-tech smartwatch and wearable hardware designs.",
        promptData: encryptPrompt("Product design render of a futuristic wearable device that [GadgetFunction], sleek metallic band, holographic screen UI, studio product catalog lighting, white backdrop")
    },
    {
        name: "Cute Chibi Character Design",
        price: 20,
        category: "DALL-E",
        imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Create adorable chibi animal characters for prints or stickers.",
        promptData: encryptPrompt("A cute chibi illustration of a [AnimalType] wearing a tiny wizard hat, big expressive eyes, pastel colors, soft digital illustration style, clean white background")
    },
    {
        name: "Sci-Fi Spacecraft Design",
        price: 35,
        category: "DALL-E",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Detailed spaceship concept artwork for games or covers.",
        promptData: encryptPrompt("Concept art of a sci-fi [SpacecraftType] ship flying through a nebula, detailed plating, glowing engines, starfield background, high-end digital painting, cinematic scale")
    },
    {
        name: "Pixel Art Sprite Sheet",
        price: 25,
        category: "DALL-E",
        imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate RPG 16-bit pixel art character sprite sheets.",
        promptData: encryptPrompt("16-bit retro pixel art sprite sheet of a [RpgCharacterClass] showing front, back, and side views, grid layout, clean pixel boundaries, transparent background")
    },
    {
        name: "Children Book Cover Creator",
        price: 30,
        category: "DALL-E",
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Create whimsical children's book cover art with hand-painted textures.",
        promptData: encryptPrompt("Whimsical watercolor illustration for a children's book cover titled '[StoryTitle]', cute woodland animals, fairy tale aesthetic, hand-drawn textures, high contrast, warm lighting")
    },
    {
        name: "Retro Synthwave Poster",
        price: 25,
        category: "DALL-E",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate vibrant neon retro-synthwave art posters.",
        promptData: encryptPrompt("Retro 80s synthwave graphic poster featuring a [PosterMainElement], wireframe grid horizon, neon pink and purple sunset grid, outrun aesthetic, high resolution poster style")
    },
    {
        name: "Cyberpunk Hologram Display",
        price: 30,
        category: "DALL-E",
        imageUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate vector-line style glowing 3D holograms of objects.",
        promptData: encryptPrompt("A glowing blue neon 3D hologram of [HologramSubject] floating above a futuristic console, wireframe lines, particle effects, dark laboratory background, sci-fi tech render")
    },
    {
        name: "Cute Low Poly Creature",
        price: 20,
        category: "DALL-E",
        imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate geometric low-poly model renders of creatures.",
        promptData: encryptPrompt("Flat shading low poly 3D model render of a [CreatureType], clean geometric facets, simple color scheme, studio lighting, white backdrop, Blender render style")
    },

    // === GITHUB COPILOT CATEGORY (10 Prompts) ===
    {
        name: "TypeScript Algorithm Solver",
        price: 15,
        category: "GitHub Copilot",
        imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80",
        promptDescription: "An efficient Copilot code comment template to prompt the compiler to generate clean, typed, and unit-tested algorithm implementations.",
        promptData: encryptPrompt("// Write a highly optimized TypeScript function to solve [AlgorithmName]. Ensure O(N) time complexity, handle edge cases, and add type safety interfaces: ")
    },
    {
        name: "React Functional Component Writer",
        price: 15,
        category: "GitHub Copilot",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate typed React component structures with props validation and hooks.",
        promptData: encryptPrompt("// Write a React functional component named [ComponentName] that takes props: [ComponentProps]. Include Tailwind CSS styling, TypeScript interfaces, and use state hooks for local states: ")
    },
    {
        name: "Regex Pattern Builder",
        price: 10,
        category: "GitHub Copilot",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Comments to generate reliable Regular Expressions to validate strings.",
        promptData: encryptPrompt("// Generate a regular expression pattern to match and validate [StringMatchingCriteria]. Add comments explaining each capture group and edge cases handled: ")
    },
    {
        name: "Python Web Scraper Tool",
        price: 20,
        category: "GitHub Copilot",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate BeautifulSoup Python scripts to fetch tabular webpage content.",
        promptData: encryptPrompt("# Write a Python script using requests and BeautifulSoup to scrape product data from [TargetUrl]. Parse product names and prices, write them into a CSV file, and add error handling: ")
    },
    {
        name: "SQL Database Query Optimizer",
        price: 15,
        category: "GitHub Copilot",
        imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Comments to generate optimized JOIN operations on relational databases.",
        promptData: encryptPrompt("-- Write an optimized PostgreSQL query to select columns from tables and join on foreign keys. Requirements: filter by [QueryFilters], order by [SortingColumn], and optimize with indexing: ")
    },
    {
        name: "Jest Unit Test Case Generator",
        price: 15,
        category: "GitHub Copilot",
        imageUrl: "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Comments to generate unit tests mocking modules and checking results.",
        promptData: encryptPrompt("// Write a comprehensive suite of Jest unit tests to verify the function: [FunctionCode]. Include tests for standard usage, edge cases, and mock network calls: ")
    },
    {
        name: "Dockerfile Packaging Blueprint",
        price: 15,
        category: "GitHub Copilot",
        imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Dockerfile definitions to package Node/Python apps into multi-stage builds.",
        promptData: encryptPrompt("# Write a multi-stage build Dockerfile for a [AppFramework] application. Optimize layer caching, run as non-root user, and expose port [PortNumber]: ")
    },
    {
        name: "Express.js REST API Controller",
        price: 20,
        category: "GitHub Copilot",
        imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate CRUD controllers using Express and Mongoose schemas.",
        promptData: encryptPrompt("// Write an Express REST controller for CRUD operations on a Mongoose model named [EntityName]. Include validation, error responses, and async/await handlers: ")
    },
    {
        name: "Tailwind CSS Grid Builder",
        price: 10,
        category: "GitHub Copilot",
        imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate responsive HTML layouts styled with Tailwind grid systems.",
        promptData: encryptPrompt("<!-- Write a responsive HTML card grid component using Tailwind CSS. Columns: 1 on mobile, 2 on tablet, 4 on desktop. Layout features: [ResponsiveLayout] -->")
    },
    {
        name: "Git Commit Message Structurer",
        price: 10,
        category: "GitHub Copilot",
        imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        promptDescription: "Generate semantic commit messages based on diff text.",
        promptData: encryptPrompt("# Write a semantic git commit message following Conventional Commits format based on the following diff summary: [CodeDiffSummary]")
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
        console.log(`Inserting ${samplePrompts.length} sample prompts...`);
        await Prompt.insertMany(samplePrompts);
        
        console.log("Database seeded successfully! 🌱");
        process.exit(0);
    } catch (err) {
        console.error("Database seeding failed:", err);
        process.exit(1);
    }
};

seedDB();
