const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const testLogin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const email = 'admin@macaalinka.com';
        const password = 'adminpassword123';

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            console.log('User not found');
            process.exit(1);
        }

        console.log('User found:', user.email);
        console.log('Hashed password in DB:', user.password);

        const isMatch = await user.matchPassword(password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            // Test hashing manually
            const salt = await bcrypt.genSalt(10);
            const manualHash = await bcrypt.hash(password, salt);
            console.log('Manual hash of input password:', manualHash);

            const isMatchManual = await bcrypt.compare(password, user.password);
            console.log('Direct bcrypt.compare match:', isMatchManual);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

testLogin();
