const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const login = async (data) => {
    const user = await userRepository.findByEmail(data.email);

    if (!user) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    const passwordMatch = await bcrypt.compare(
        data.password,
        user.password
    );

    if (!passwordMatch) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );

    return token;
};

const register = async (data) => {

    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
        const error = new Error('Email already exists');
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await userRepository.create({
        name: data.name,
        email: data.email,
        password: hashedPassword
    });
};

module.exports = {
    register,
    login
};