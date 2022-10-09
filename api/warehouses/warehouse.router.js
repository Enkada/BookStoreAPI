const router = require("express").Router();
const { 
    createWarehouse, 
    updateWarehouse, 
    deleteWarehouse, 
    getWarehouseById, 
    getWarehouses,
    getWarehouseBooks,
    addWarehouseBook
} = require("./warehouse.controller");

const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createWarehouse);
router.get("/", checkToken, getWarehouses);
router.get("/:id", checkToken, getWarehouseById);
router.patch("/", checkToken, updateWarehouse);
router.delete("/", checkToken, deleteWarehouse);

router.get("/:id/books", checkToken, getWarehouseBooks);
router.post("/:id/books", checkToken, addWarehouseBook);

module.exports = router;