const pool = require("../../config/database");

module.exports = {
    createBook: (data, callBack) => {
        pool.query(
            `INSERT INTO books(ISBN, name, description, publisher, authors, pages)
            values(?, ?, ?, ?, ?, ?)`,
            [
                data.ISBN,
                data.name,
                data.description,
                data.publisher,
                data.authors,
                data.pages
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getBooks: callBack => {
        pool.query(
            `SELECT ISBN, name, description, publisher, authors, pages FROM books`, 
            [],
            (error, results, fields) => {
                
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getBookByISBN: (ISBN, callBack) => {
        pool.query(
            `SELECT ISBN, name, description, publisher, authors, pages FROM books WHERE ISBN = ?`, 
            [ISBN],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    },
    updateBook: (data, callBack) => {
        pool.query(
            `UPDATE books SET name = ?, description = ?, publisher = ?, authors = ? , pages = ? WHERE ISBN = ?`,
            [
                data.name,
                data.description,
                data.publisher,
                data.authors,
                data.pages,
                data.ISBN
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    deleteBook: (ISBN, callBack) => {
        pool.query(
            `DELETE FROM books WHERE ISBN = ?`, 
            [ISBN],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getBookAvailability: (ISBN, callBack) => {
        pool.query(
            `SELECT books_availability.*, shops.address as shop_address, warehouses.address as warehouse_address
            FROM books_availability
            LEFT JOIN warehouses ON warehouses.id = warehouse_id 
            LEFT JOIN shops ON shops.id = shop_id 
            WHERE book_isbn = ?`, 
            [ISBN],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
};