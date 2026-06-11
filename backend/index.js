require('dotenv').config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const authRoutes = require('./routes/authRoutes.js')
const uplaodPrompt = require('./routes/uploadPromptRoute.js')
const promptRoute = require('./routes/promptRoutes.js')
const categoryRoute = require('./routes/categoryRoutes.js')
const pricingRoute = require('./routes/pricingRoutes.js')
const connectDB = require('./database/config.js')

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/upload", uplaodPrompt);
app.use("/api/v1/prompt", promptRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/plan", pricingRoute);



const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

