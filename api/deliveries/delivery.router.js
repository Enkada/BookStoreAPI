const router = require("express").Router();
const { 
    createDelivery, 
    deleteDelivery, 
    getDeliveryById, 
    getDeliveries,
    addDeliveryBook,
    getDeliveryBooks,
    deleteDeliveryBooks
} = require("./delivery.controller");

const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createDelivery);
router.get("/", checkToken, getDeliveries);
router.get("/:id", checkToken, getDeliveryById);
router.delete("/", checkToken, deleteDelivery);

router.post("/:id/books", checkToken, addDeliveryBook);
router.get("/:id/books", checkToken, getDeliveryBooks);
router.delete("/:id/books", checkToken, deleteDeliveryBooks);



module.exports = router;