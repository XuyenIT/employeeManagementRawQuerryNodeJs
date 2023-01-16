const express = require("express");
const employeeRouter = require("./employee.router");

const rootRouter = express.Router();
rootRouter.use("/employee", employeeRouter);
module.exports = rootRouter;
