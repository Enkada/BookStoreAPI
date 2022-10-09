const { 
    createDelivery, 
    getDeliveryById, 
    deleteDelivery, 
    updateDeliveryDateTime, 
    getDeliveries,
    addDeliveryBook,
    getDeliveryBooks,
    deleteDeliveryBooks
} = require("./delivery.service");

module.exports = {
    createDelivery: (req, res) => {
        const body = req.body;
        createDelivery(body, (err, results) => {
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
    getDeliveryById: (req, res) => {
        const id = req.params.id;
        getDeliveryById(id, (err, results) => {
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
    getDeliveries: (req, res) => {
        getDeliveries((err, results) => {
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
    updateDeliveryDateTime: (req, res) => {
        const body = req.body;
        updateDeliveryDateTime(body, (err, results) => {
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
    deleteDelivery: (req, res) => {
        const id = req.body.id;
        deleteDelivery(id, (err, results) => {
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
    addDeliveryBook: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        addDeliveryBook([id, body], (err, results) => {
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
    getDeliveryBooks: (req, res) => {
        const id = req.params.id;
        getDeliveryBooks(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    deleteDeliveryBooks: (req, res) => {
        const id = req.params.id;
        deleteDeliveryBooks(id, (err, results) => {
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