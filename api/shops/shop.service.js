const pool = require("../../config/database");

module.exports = {
    createShop: (data, callBack) => {
        pool.query(
            `INSERT INTO shops(id, address, opening_time, closing_time)
            values(?, ?, ?, ?)`,
            [
                data.id,
                data.address,
                data.opening_time,
                data.closing_time
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getShops: callBack => {
        pool.query(
            `SELECT id, address, opening_time, closing_time FROM shops`, 
            [],
            (error, results, fields) => {
                
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getShopById: (id, callBack) => {
        pool.query(
            `SELECT id, address, opening_time, closing_time FROM shops WHERE id = ?`, 
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results[0])
            }
        );
    },
    updateShop: (data, callBack) => {
        pool.query(
            `UPDATE shops SET address = ?, opening_time = ?, closing_time = ? WHERE id = ?`,
            [
                data.address,
                data.opening_time,
                data.closing_time,
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
    deleteShop: (id, callBack) => {
        pool.query(
            `DELETE FROM shops WHERE id = ?`, 
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    reduceWarehouseBookAmount: (data, callBack) => {
        pool.query(
            `UPDATE books_availability SET amount = amount - ? WHERE id = ?`,
            [
                data[1],
                data[0],
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    increaseShopBookAmount: (data, callBack) => {
        pool.query(
            `UPDATE books_availability SET amount = amount - ? WHERE id = ?`,
            [
                data[0],
                data[1],
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    getShopBooks: (id, callBack) => {
        pool.query(
            `SELECT * FROM books_availability WHERE shop_id = ?`, 
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        );
    },
    addShopBook: (data, callBack) => {
        pool.query(
            `INSERT INTO books_availability(book_isbn, shop_id, amount)
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
    updateShopBookAmount: (data, callBack) => {
        pool.query(
            `UPDATE books_availability SET amount = ? WHERE book_isbn = ? AND shop_id = ?`,
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
};