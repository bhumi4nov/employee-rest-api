const employeeService = require('../services/employeeService');

const getEmployees = async (req, res) => {
    const employees = await employeeService.getEmployees();

    res.status(200).json(employees);
};

const getEmployeeById = async (req, res) => {
    const employee = await employeeService.getEmployeeById(req.params.id);

    if (!employee) {
        return res.status(404).json({
            message: 'Employee not found'
        });
    }

    res.status(200).json(employee);
};

const createEmployee = async (req, res, next) => {
    try {
        const employee = await employeeService.createEmployee(req.body);

        res.status(201).json(employee);
    } catch (error) {
        next(error);
    }
};

const updateEmployee = async (req, res) => {
    const employee = await employeeService.updateEmployee(
        req.params.id,
        req.body
    );

    if (!employee) {
        return res.status(404).json({
            message: 'Employee not found'
        });
    }

    res.status(200).json(employee);
};

const patchEmployee = async (req, res) => {
    const employee = await employeeService.patchEmployee(
        req.params.id,
        req.body
    );

    if (!employee) {
        return res.status(404).json({
            message: 'Employee not found'
        });
    }

    res.status(200).json(employee);
};

const deleteEmployee = async (req, res) => {
    const employee = await employeeService.deleteEmployee(
        req.params.id
    );

    if (!employee) {
        return res.status(404).json({
            message: 'Employee not found'
        });
    }

    res.status(200).json({
        message: 'Employee deleted successfully'
    });
};

module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    patchEmployee,
    deleteEmployee
};