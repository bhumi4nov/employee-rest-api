const employeeRepository = require('../repositories/employeeRepository');

const getEmployees = async() => {
    return await employeeRepository.getAll();
};

const getEmployeeById = async(id) => {
    return await employeeRepository.getById(id);
};

const createEmployee = async(data) => {
    const newEmployee = {
    //    id: employeeRepository.getNextId(),
        name: data.name,
        email: data.email,
        department: data.department,
        age: data.age
    };

    return await employeeRepository.create(newEmployee);
};

const updateEmployee = async(id, data) => {
    return await employeeRepository.update(id, {
        name: data.name,
        email: data.email,
        department: data.department,
        age: data.age
    });
};

const patchEmployee = async(id, data) => {
    return await employeeRepository.update(id, data);
};

const deleteEmployee = async(id) => {
    return await employeeRepository.remove(id);
};

module.exports = {
    getEmployeeById,
    getEmployees,
    createEmployee,
    updateEmployee,
    patchEmployee,
    deleteEmployee
};