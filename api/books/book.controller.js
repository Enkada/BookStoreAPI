const { 
    createBook, 
    getBookByISBN, 
    deleteBook, 
    updateBook, 
    getBooks,
    getBookAvailability
} = require("./book.service");

module.exports = {
    createBook: (req, res) => {
        const body = req.body;
        body.ISBN = body.ISBN.replace(/-/g, '')
        createBook(body, (err, results) => {
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
    getBookByISBN: (req, res) => {
        const ISBN = req.params.ISBN;
        getBookByISBN(ISBN, (err, results) => {
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
    getBooks: (req, res) => {
        getBooks((err, results) => {
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
    updateBook: (req, res) => {
        const body = req.body;
        updateBook(body, (err, results) => {
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
    deleteBook: (req, res) => {
        const ISBN = req.body.ISBN;
        console.log(req);
        deleteBook(ISBN, (err, results) => {
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
                message: "Запись успешно удалена",
                data: results
            });
        })
    },
    getBookAvailability: (req, res) => {
        const ISBN = req.params.ISBN;
        getBookAvailability(ISBN, (err, results) => {
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
};