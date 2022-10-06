require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/employees/employee.router");
const bookRouter = require("./api/books/book.router");

app.use(express.json());

app.use("/api/employees", userRouter);
app.use("/api/books", bookRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("Running on! http://127.0.0.1:" + process.env.APP_PORT);
});