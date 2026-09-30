const Employee = require('../models/employeeModel');

const getAll = async () => {
    return await Employee.find();
};

const getById = async (id) => {
    return await Employee.findById(id);
};

const create = async (employee) => {
    return await Employee.create(employee);
};

const update = async (id, data) => {
    return await Employee.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );
};

const remove = async (id) => {
    return await Employee.findByIdAndDelete(id);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};