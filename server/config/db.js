const mongoose = require("mongoose");

require('dotenv').config();

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)

        console.log(`Connected to MongoDB! DB host: ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("MongoDB connection error ", error)
        process.exit(1)
    }
}

module.exports = connectDB;
