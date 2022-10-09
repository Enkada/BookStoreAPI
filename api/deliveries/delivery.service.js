const pool = require("../../config/database");

module.exports = {
    createDelivery: (data, callBack) => {
        pool.query(
            `INSERT INTO deliveries(shop_id, warehouse_id, order_datetime)
            values(?, ?, CURRENT_TIMESTAMP)`,
            [
                data.shop_id,
                data.warehouse_id,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getDeliveries: callBack => {
        pool.query(
            `SELECT * FROM deliveries`, 
            [],
            (error, results, fields) => {
                
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getDeliveryById: (id, callBack) => {
        pool.query(
            `SELECT * FROM deliveries WHERE id = ?`, 
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    },
    updateDeliveryDateTime: (id, callBack) => {
        pool.query(
            `UPDATE deliveries SET delivery_datetime = CURRENT_TIMESTAMP WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    deleteDelivery: (id, callBack) => {
        pool.query(
            `DELETE FROM deliveries WHERE id = ?`, 
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    addDeliveryBook: (data, callBack) => {
        pool.query(
            `INSERT INTO deliveries_books(delivery, book, amount)
            values(?, ?, ?)`,
            [
                data[0],
                data[1].book,
                data[1].amount
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getDeliveryBooks: (id, callBack) => {
        pool.query(
            `SELECT book, book_isbn, deliveries_books.amount FROM deliveries_books 
            INNER JOIN books_availability ON books_availability.id = book
            WHERE delivery = ?`, 
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    deleteDeliveryBooks: (id, callBack) => {
        pool.query(
            `DELETE FROM deliveries_books WHERE delivery = ?`, 
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