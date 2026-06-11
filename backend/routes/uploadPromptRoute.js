const express = require('express');
const { uploadPromptController } = require('../controllers/uplaodPrompt.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const router = express.Router();


//UPLOAD PROMPT || POST
router.post("/upload-prompt", authMiddleware, uploadPromptController);

module.exports = router ;