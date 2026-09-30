const authService = require('../services/authService');

const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const token = await authService.login(req.body);

        res.status(200).json({
            message: 'Login successful',
            token
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login
};