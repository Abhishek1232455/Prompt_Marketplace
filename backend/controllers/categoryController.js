const Prompt = require('../models/promptModel.js');

const getCategoryByName = async (req, res) => {
    try {
        const id = req.params.id;
        let prompts = await Prompt
            .find({ category: id })
            .sort({ createdAt: -1 });

        return res.status(200).send({
            success: true,
            message: "get all prompt successfully",
            prompts,
        });
    } catch (error) {
        console.error("Error in getCategoryByName:", error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error fetching category prompts",
            error: error.message
        });
    }
}

module.exports = { getCategoryByName };