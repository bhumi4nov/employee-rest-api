const Joi = require('joi');

const employeeSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    department: Joi.string().trim().required(),
    age: Joi.number().integer().min(18).required()
});

const patchEmployeeSchema = Joi.object({
    name: Joi.string().trim(),
    email: Joi.string().email(),
    department: Joi.string().trim(),
    age: Joi.number().integer().min(18)
}).min(1);

const validateEmployee = (req, res, next) => {
    const { error } = employeeSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    next();
};

const validatePatchEmployee = (req, res, next) => {
    const { error, value } = patchEmployeeSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    req.body = value;

    next();
};

module.exports = {
    validateEmployee,
    validatePatchEmployee
}