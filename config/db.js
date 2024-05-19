const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);//change (process.env.MONGODB_URI) to (mongodb://localhost:27017/reWear)
        console.log(`Database Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;
