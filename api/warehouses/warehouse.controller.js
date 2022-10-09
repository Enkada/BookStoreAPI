const { 
    createWarehouse, 
    getWarehouseById, 
    deleteWarehouse, 
    updateWarehouse, 
    getWarehouses,
    getWarehouseBooks,
    addWarehouseBook,
    updateWarehouseBookAmount
} = require("./warehouse.service");

module.exports = {
    createWarehouse: (req, res) => {
        const body = req.body;
        createWarehouse(body, (err, results) => {
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
    getWarehouseById: (req, res) => {
        const id = req.params.id;
        getWarehouseById(id, (err, results) => {
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
    getWarehouseBooks: (req, res) => {
        const id = req.params.id;
        getWarehouseBooks(id, (err, results) => {
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
            results.forEach(r => {                
                r.amount = r.delivery_amount == null ? r.amount : r.amount - r.delivery_amount;
            });
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    addWarehouseBook: (req, res) => {
        const id = req.params.id;
        const body = req.body;

        getWarehouseBooks(id, (err, results) => {
            let isNew = results.filter(x => x.book_isbn == body.book_isbn).length == 0;
            if (err)
                return;
            if (isNew) {
                addWarehouseBook([id, body], (err, results) => {
                    if (err)
                        return;
                    if (!results.affectedRows)
                        return res.json({ success: 0, message: "Запись не найдена", data: results });

                    return res.status(200).json({ success: 1, data: results });
                });
            }
            else {
                body.amount += results.filter(x => x.book_isbn == body.book_isbn)[0].amount;
                updateWarehouseBookAmount([id, body], (err, results) => {
                    if (err)
                        return;
                    if (!results.affectedRows)
                        return res.json({ success: 0, message: "Запись не найдена", data: results });

                    return res.status(200).json({ success: 1, data: results });
                });
            }
        });        
    },
    getWarehouses: (req, res) => {
        getWarehouses((err, results) => {
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
    updateWarehouse: (req, res) => {
        const body = req.body;
        updateWarehouse(body, (err, results) => {
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
    deleteWarehouse: (req, res) => {
        const id = req.body.id;
        deleteWarehouse(id, (err, results) => {
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
    }
};