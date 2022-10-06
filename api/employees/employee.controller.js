const { 
    createEmployee, 
    getEmployeeById, 
    deleteEmployee, 
    updateEmployee, 
    getEmployees,
    getEmployeeByPhone
} = require("./employee.service");

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createEmployee: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        createEmployee(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "DB connection error!"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getEmployeeById: (req, res) => {
        const id = req.params.id;
        getEmployeeById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Запись не найдена"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    getEmployees: (req, res) => {
        getEmployees((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    updateEmployee: (req, res) => {
        const body = req.body;
        //const salt = genSaltSync(10);
        //body.password = hashSync(body.password, salt);

        updateEmployee(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results.affectedRows) {
                return res.json({
                    success: 0,
                    message: "Запись не найдена",
                    data: results
                });
            }
            return res.json({
                success: 1,
                message: "Информация обновлена успешно",
                data: results
            });
        });
    },
    deleteEmployee: (req, res) => {
        const id = req.body.id;
        deleteEmployee(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results.affectedRows) {
                return res.json({
                    success: 0,
                    message: "Запись не найдена",
                    data: results
                });
            }
            return res.json({
                success: 1,
                message: "Пользователь успешно удален",
                data: results
            });
        })
    },
    login: (req, res) => {
        const body = req.body;
        getEmployeeByPhone(body.phone, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Неверные данные",
                    data: results
                });
            }
            const compareResult = compareSync(body.password, results.password);
            if (compareResult) {
                results.password = undefined;
                const jsontoken = sign({ result: compareResult }, "ADMIN_KEY", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "Вход произведен успешно",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Неверные данные"
                });
            }            
        })
    },
};