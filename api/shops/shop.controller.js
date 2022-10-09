const { 
    createShop, 
    getShopById, 
    deleteShop, 
    updateShop, 
    getShops,
    getShopBooks,
    addShopBook,
    updateShopBookAmount,
    reduceWarehouseBookAmount
} = require("./shop.service");

const { 
    getDeliveryBooks,
    updateDeliveryDateTime,
    getDeliveryById
} = require("../deliveries/delivery.service");

module.exports = {
    createShop: (req, res) => {
        const body = req.body;
        createShop(body, (err, results) => {
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
    getShopById: (req, res) => {
        const id = req.params.id;
        getShopById(id, (err, results) => {
            if (err)
                return;
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
    getShops: (req, res) => {
        getShops((err, results) => {
            if (err)
                return;
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    updateShop: (req, res) => {
        const body = req.body;
        updateShop(body, (err, results) => {
            if (err)
                return;
            if (!results.affectedRows)
                return res.json({ success: 0, message: "Запись не найдена", data: results });

            return res.json({
                success: 1,
                message: "Информация обновлена успешно",
                data: results
            });
        });
    },
    deleteShop: (req, res) => {
        const id = req.body.id;
        console.log(req);
        deleteShop(id, (err, results) => {
            if (err)
                return;
            if (!results.affectedRows)
                return res.json({ success: 0, message: "Запись не найдена", data: results });

            return res.json({
                success: 1,
                message: "Запись успешно удалена",
                data: results
            });
        });
    },
    getShopBooks: (req, res) => {
        const id = req.params.id;
        getShopBooks(id, (err, results) => {
            if (err)
                return;
            if (!results)
                return res.json({ success: 0, message: "Запись не найдена", data: results });

            return res.status(200).json({ success: 1, data: results });
        })
    },
    acceptDelivery: (req, res) => {
        const id = req.body.id;

        // Обновляем время доставки
        updateDeliveryDateTime(id, (err, results) => {
            if (err)
                return;
            if (!results.affectedRows)
                return res.json({ success: 0, message: "Запись не найдена1", data: results });
            
            // Получаем данные о доставке
            getDeliveryById(id, (err, delivery) => {
                if (err)
                    return;
                if (!delivery)
                    return res.json({ success: 0, message: "Запись не найдена2" });
                
                // Получаем список поставляемых книг
                getDeliveryBooks(id, (err, deliveryBooks) => {
                    if (err)
                        return;
                    
                    deliveryBooks.forEach(r => {
                        let book = {};
                        book.book_isbn = r.book_isbn;
                        book.amount = r.amount;

                        // Уменьшение количества книг на складе
                        reduceWarehouseBookAmount([r.book, r.amount], (err, results) => {
                            if (err)
                                return;
                            if (!results.affectedRows)
                                return res.json({ success: 0, message: "Запись не найдена", data: results });
                
                            
                            // Получение списка книг в магазине
                            getShopBooks(delivery.shop_id, (err, shopBooks) => {
                                let isNew = shopBooks.filter(x => x.book_isbn == book.book_isbn).length == 0;
                                if (err)
                                    return;                                
                                
                                    console.log();
                                // Увеличение количества книг в магазине
                                if (isNew) {
                                     
                                    addShopBook([delivery.shop_id, book], (err, results) => {
                                        if (err)
                                            return;
                                        if (!results.affectedRows)
                                            return res.json({ success: 0, message: "Запись не найдена", data: results });
                                    });
                                }
                                else {
                                    book.amount += shopBooks.filter(x => x.book_isbn == book.book_isbn)[0].amount;
                                    updateShopBookAmount([id, book], (err, results) => {
                                        if (err)
                                            return;
                                        if (!results.affectedRows)
                                            return res.json({ success: 0, message: "Запись не найдена", data: results });
                                    });
                                }
                            });
                        });
                    });
                    return res.status(200).json({ success: 1, data: results });
                });
            });            
        });
    },
    sellBook: (req, res) => {
        const body = req.body;
        sellBook(body, (err, results) => {
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
};