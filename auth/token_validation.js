const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {            
            token = token.slice(7); // Removes "Bearer " at the start
            verify(token, "ADMIN_KEY", (err, decoded) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: "Неверный токен"
                    });
                }
                else {
                    next();
                }
            });
        }
        else {
            res.json({
                success: 0,
                message: "Доступ запрещен"
            });
        }
    }
}