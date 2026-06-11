const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/prompt_marketplace';
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`connected to MongoDb ${mongoose.connection.host}`)
    }catch(err){
        console.log(`MongoDb database error: ${err}`);
    }
}

module.exports = connectDB;