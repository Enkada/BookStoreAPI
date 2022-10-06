const router = require("express").Router();
const { 
    createEmployee, 
    updateEmployee, 
    deleteEmployee, 
    getEmployeeById, 
    getEmployees,
    login
} = require("./employee.controller");

const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createEmployee);
router.get("/", checkToken, getEmployees);
router.get("/:id", checkToken, getEmployeeById);
router.patch("/", checkToken, updateEmployee);
router.delete("/", checkToken, deleteEmployee);

router.post("/login", login);

module.exports = router;