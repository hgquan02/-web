const mongoose = require('mongoose');
const mysql = require('mysql2');

// Kết nối MongoDB
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

//Kết nối MySQL
const connectMySQL = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connectMySQL.connect((err) => {
    if (err) {
        console.error('MySQL connection failed:', err);
        process.exit(1);
    } else {
        console.log('MySQL connected');
    }
});

// Xuất các hàm và model MongoDB
/*module.exports = {
    connectMongoDB,
    connectMySQL,
    mongoose,
    models: {
        Users: require('./schemas/users'),
        Message: require('./schemas/message')
    }
};*/

connectMongoDB();
module.exports = {
    connectMongoDB,
    mongoose,
    models: {
        Product: require('./schemas/productModel')
    }
};