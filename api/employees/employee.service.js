const pool = require("../../config/database");

module.exports = {
    createEmployee: (data, callBack) => {
        pool.query(
            `INSERT INTO employees(fullName, phone, password)
            values(?, ?, ?)`,
            [
                data.fullName,
                data.phone,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getEmployees: callBack => {
        pool.query(
            `SELECT id, fullName, phone FROM employees`, 
            [],
            (error, results, fields) => {
                
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getEmployeeById: (id, callBack) => {
        pool.query(
            `SELECT id, fullName, phone FROM employees WHERE id = ?`, 
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    },
    getEmployeeByPhone: (phone, callBack) => {
        pool.query(
            `SELECT id, fullName, password, phone FROM employees WHERE phone = ?`, 
            [phone],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    },
    updateEmployee: (data, callBack) => {
        pool.query(
            `UPDATE employees SET fullName = ?, phone = ? WHERE id = ?`,
            [
                data.fullName,
                data.phone,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    deleteEmployee: (id, callBack) => {
        pool.query(
            `DELETE FROM employees WHERE id = ?`, 
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    }
};