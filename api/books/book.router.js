const router = require("express").Router();
const { 
    createBook, 
    updateBook, 
    deleteBook, 
    getBookByISBN, 
    getBooks,
    getBookAvailability
} = require("./book.controller");

const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createBook);
router.get("/", checkToken, getBooks);
router.get("/:ISBN", checkToken, getBookByISBN);
router.patch("/", checkToken, updateBook);
router.delete("/", checkToken, deleteBook);

router.get("/:ISBN/availability", checkToken, getBookAvailability);

module.exports = router;