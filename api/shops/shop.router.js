const router = require("express").Router();
const { 
    createShop, 
    updateShop, 
    deleteShop, 
    getShopById, 
    getShops,
    getShopBooks,
    acceptDelivery,
    sellBook
} = require("./shop.controller");

const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createShop);
router.get("/", checkToken, getShops);
router.get("/:id", checkToken, getShopById);
router.patch("/", checkToken, updateShop);
router.delete("/", checkToken, deleteShop);

router.get("/:id/books", checkToken, getShopBooks);
router.get("/:id/books/sell", checkToken, sellBook);

router.post("/accept", checkToken, acceptDelivery);

module.exports = router;