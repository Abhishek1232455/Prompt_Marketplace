const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const path = require('path');
const User = require('../models/userModel.js');

// Simple in-memory deduplication for processed checkout sessions
const processedSessions = new Set();

// buy current plan || POST
router.post("/purchase", async (req, res) => {
    try {
        const data = req.body;
        console.log("Purchase payload:", data);

        if (!data.plan || !data.price || !data.userId) {
            return res.status(400).json({ message: "Missing required checkout parameters" });
        }

        const lineItems = [{
            price_data: {
                currency: "inr",
                product_data: {
                    name: data.plan,
                },
                unit_amount: data.price * 100,
            },
            quantity: 1
        }];

        const protocol = req.secure ? 'https' : 'http';
        const host = req.get('host');

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${protocol}://${host}/api/v1/plan/success?session_id={CHECKOUT_SESSION_ID}&userId=${data.userId}&price=${data.price}`,
            cancel_url: 'http://localhost:3000/pricing',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Payment initialization error:", error);
        return res.status(500).json({ message: "Internal Server Error during checkout setup" });
    }
});

// payment success callback || GET
router.get('/success', async (req, res) => {
    try {
        const { session_id, userId, price } = req.query;

        if (!session_id || !userId || !price) {
            return res.status(400).send('Missing session validation parameters.');
        }

        // Prevent double crediting upon refresh
        if (processedSessions.has(session_id)) {
            const htmlFilePath = path.join(__dirname, '../pages/paymentSuccess.html');
            return res.sendFile(htmlFilePath);
        }

        // Verify the payment state with Stripe directly
        const session = await stripe.checkout.sessions.retrieve(session_id);
        if (!session || session.payment_status !== 'paid') {
            return res.status(400).send('Payment has not been paid or verified.');
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Map price (INR) to actual credit amounts
        const priceToCreditsMap = {
            49: 100,
            99: 250,
            199: 500
        };

        const planPrice = parseInt(price, 10);
        const creditsToAdd = priceToCreditsMap[planPrice] || planPrice; // fallback if plan price changes

        const remaining = parseInt(user.userCredits, 10) || 0;
        user.userCredits = remaining + creditsToAdd;
        await user.save();

        // Deduplicate this session
        processedSessions.add(session_id);

        const htmlFilePath = path.join(__dirname, '../pages/paymentSuccess.html');
        res.sendFile(htmlFilePath);
    } catch (error) {
        console.error("Payment success verification error:", error);
        res.status(500).send('Internal Server Error verifying transaction.');
    }
});

module.exports = router;
