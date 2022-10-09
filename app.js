require("dotenv").config();
const express = require("express");
const app = express();

const userRouter = require("./api/employees/employee.router");
const bookRouter = require("./api/books/book.router");
const shopRouter = require("./api/shops/shop.router");
const warehouseRouter = require("./api/warehouses/warehouse.router");
const deliveryRouter = require("./api/deliveries/delivery.router");

app.use(express.json());

app.use("/api/employees", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/shops", shopRouter);
app.use("/api/warehouses", warehouseRouter);
app.use("/api/deliveries", deliveryRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Running on! http://127.0.0.1:" + process.env.APP_PORT);
});