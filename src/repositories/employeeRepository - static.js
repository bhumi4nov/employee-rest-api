const getAll = async() => {
    return employees;
};

const getById = async(id) => {
    return employees.find(
        employee => employee.id === parseInt(id)
    );
};

/* const getNextId = async() => {
    return employees.length + 1;
}; */

const create = async(employee) => {
    employees.push(employee);
    return employee;
};

const update = async(id, data) => {
    const index = employees.findIndex(
        employee => employee.id === parseInt(id)
    );

    if (index === -1) {
        return null;
    }

    employees[index] = {
        ...employees[index],
        ...data
    };

    return employees[index];
};

const remove = async(id) => {
    const index = employees.findIndex(
        employee => employee.id === parseInt(id)
    );

    if (index === -1) {
        return false;
    }

    employees.splice(index, 1);
    return true;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};