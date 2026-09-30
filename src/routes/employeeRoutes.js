const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');
const router = express.Router();

const {
    validateEmployee,
    validatePatchEmployee
} = require('../validators/employeeValidator');

const {getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, patchEmployee} = require('../controllers/employeeController');

router.use(authenticate);

router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.post('/', authorize('admin'), validateEmployee, createEmployee);
router.put('/:id', authorize('admin'), validateEmployee, updateEmployee);
router.delete('/:id', authorize('admin'), deleteEmployee);
router.patch('/:id', authorize('admin'), validatePatchEmployee, patchEmployee);

module.exports = router;