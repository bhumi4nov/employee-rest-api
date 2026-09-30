const employeeService = require('../services/employeeService');

const getEmployees = (req, res) => {
    const employees = employeeService.getEmployees();
    res.json({
        success: true,
        data: employees
    });
};

const getEmployee = (req, res) => {
    const id = Number(req.params.id);

   // Move to Service
   //  const employee = employees.find(employee => employee.id === id);

   const employee = employeeService.getEmployeeById(id);

    if (!employee) {
        return res.status(404).json({
            success: false,
            message: 'Employee not found'
        });
    }

    res.json({
        success: true,
        data: employee
    });
};

// Create Employee

const createEmployee = (req, res) => {
    const { name, email, department, age } = req.body;

    if (!name || !email || !department || !age) {
        return res.status(400).json({
            success: false,
            message: 'Name, email, department and age are required'
        });
    }

    const newEmployee = employeeService.createEmployee({
        name,
        email,
        department,
        age
    });

    // Move to Service
    /* const newEmployee = {
        id: employees.length + 1,
        name,
        email,
        department,
        age
    };

    employees.push(newEmployee); */

    res.status(201).json({
        success: true,
        data: newEmployee
    });
};

const updateEmployee = (req, res) => {
    const id = Number(req.params.id);

    const employee = employeeService.updateEmployee(id, req.body);

    if (!employee) {
        return res.status(404).json({
            success: false,
            message: 'Employee not found'
        });
    }

    // Move to Service
    /* const { name, email, department, age } = req.body;

    employee.name = name;
    employee.email = email;
    employee.department = department;
    employee.age = age; */

    res.json({
        success: true,
        data: employee
    });
};

const deleteEmployee = (req, res) => {
    const deleted = employeeService.deleteEmployee(req.params.id);

    if (!deleted) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    res.status(204).send();
};

const patchEmployee = (req, res) => {
    const id = Number(req.params.id);

    const employee = employeeService.patchEmployee(id, req.body);

    if (!employee) {
        return res.status(404).json({
            success: false,
            message: 'Employee not found'
        });
    }

    res.json({
        success: true,
        data: employee
    });
};

module.exports = {
    getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee, patchEmployee
};