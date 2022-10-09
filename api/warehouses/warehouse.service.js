const pool = require("../../config/database");

module.exports = {
    createWarehouse: (data, callBack) => {
        pool.query(
            `INSERT INTO warehouses(address)
            values(?)`,
            [
                data.address
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getWarehouses: callBack => {
        pool.query(
            `SELECT id, address FROM warehouses`, 
            [],
            (error, results, fields) => {
                
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getWarehouseById: (id, callBack) => {
        pool.query(
            `SELECT id, address FROM warehouses WHERE id = ?`, 
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    },
    getWarehouseBooks: (id, callBack) => {
        pool.query(
            `SELECT *, (SELECT SUM(deliveries_books.amount) FROM deliveries_books 
            INNER JOIN deliveries ON deliveries.id = delivery
            WHERE warehouse_id = ? AND book = books_availability.id AND deliveries.delivery_datetime = 0) as delivery_amount 
            FROM books_availability WHERE warehouse_id = ?`, 
            [id, id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    addWarehouseBook: (data, callBack) => {
        pool.query(
            `INSERT INTO books_availability(book_isbn, warehouse_id, amount)
            values(?, ?, ?)`,
            [
                data[1].book_isbn,                
                data[0],
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
    updateWarehouseBookAmount: (data, callBack) => {
        pool.query(
            `UPDATE books_availability SET amount = ? WHERE book_isbn = ? AND warehouse_id = ?`,
            [
                data[1].amount,  
                data[1].book_isbn,              
                data[0]
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    updateWarehouse: (data, callBack) => {
        pool.query(
            `UPDATE warehouses SET address = ? WHERE id = ?`,
            [
                data.address,
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
    deleteWarehouse: (id, callBack) => {
        pool.query(
            `DELETE FROM warehouses WHERE id = ?`, 
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