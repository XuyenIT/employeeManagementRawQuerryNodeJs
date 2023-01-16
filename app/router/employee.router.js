const express = require("express");
const {
  listEmployee,
  getCreateFormEmployee,
  createEmployee,
  deleteEmployee,
  detailEmployee,
  getFormUpdateEmployee,
  updateEmployee,
} = require("../controllers/employee.controller");
const handleUpload = require("../middlewares/upload/upload_image");
const checkEmpty = require("../middlewares/validate/checkEmpty");

const employeeRouter = express.Router();
employeeRouter.get("/", listEmployee);
employeeRouter.get("/create", getCreateFormEmployee);

employeeRouter.post("/create", handleUpload(), checkEmpty, createEmployee);
employeeRouter.get("/delete/:id", deleteEmployee);
employeeRouter.get("/detail/:id", detailEmployee);
employeeRouter.get("/update/:id", getFormUpdateEmployee);
employeeRouter.post("/update", handleUpload(), updateEmployee);
module.exports = employeeRouter;
