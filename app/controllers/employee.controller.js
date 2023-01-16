const connect = require("../configs/connectDB");
const fs = require("fs");
const path = require("path");

let appString = "app\\public";
const listEmployee = async (req, res) => {
  const [rows, fields] = await connect.execute("SELECT * FROM tbemployee");
  res.render("./employee/list_employee.ejs", { listEmployee: rows });
};
const getCreateFormEmployee = (req, res) => {
  res.render("./employee/create_employee.ejs");
};
const createEmployee = async (req, res) => {
  if (req.filedNull) {
    req.session.message = {
      type: "error",
      message: req.filedNull,
    };
    res.redirect("/employee/create");
  } else {
    const file = req.file;
    //lay duong dan den file hinh luu xuong database
    // upload\1673788604868-baoden.png ket hop http://localhost:3000/upload\1673788604868-baoden.png
    //get duoc hinh
    let pathFile = "";
    pathFile = file.path.substr(appString.length + 1);
    const { fullName, age, address } = req.body;
    const [rows, fields] = await connect.execute(
      "INSERT INTO tbemployee(fullName,age,address,image) VALUES(?,?,?,?)",
      [fullName, age, address, pathFile]
    );
    if (rows.affectedRows == 1) {
      res.redirect("/employee");
    } else {
      console.log("error");
    }
  }
};
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const [employee] = await connect.execute(
    "DELETE FROM tbemployee where id =?",
    [id]
  );
  if (employee.affectedRows == 0) {
    console.log("loi");
  } else {
    res.redirect("/employee");
  }
};
const detailEmployee = async (req, res) => {
  const { id } = req.params;
  const [employee] = await connect.execute(
    "SELECT * FROM tbemployee where id =?",
    [id]
  );
  res.render("./employee/detail_employee.ejs", { employee: employee[0] });
};
const getFormUpdateEmployee = async (req, res) => {
  const { id } = req.params;
  const [employee] = await connect.execute(
    "SELECT * FROM tbemployee where id =?",
    [id]
  );
  res.render("./employee/update_employee.ejs", { employee: employee[0] });
};
const updateEmployee = async (req, res) => {
  const { id, fullName, age, address } = req.body;
  const { file } = req;
  let new_image = "";
  if (file) {
    new_image = file.path.substr(appString.length + 1);
    console.log("new_image new", new_image);
    try {
      fs.unlinkSync("./app/public/" + req.body.old_image);
    } catch (error) {
      console.log("error", error);
    }
  } else {
    new_image = req.body.old_image;
    console.log("new_image old", new_image);
  }
  const [employee] = await connect.execute(
    "UPDATE tbemployee SET fullName=?, age=?,address=?,image=? WHERE id =?",
    [fullName, age, address, new_image, id]
  );
  console.log("id", id);
  if (employee.affectedRows === 1) {
    console.log("employee: ", employee);
    res.redirect("/employee");
  } else {
    console.log("error");
  }
};
module.exports = {
  listEmployee,
  getCreateFormEmployee,
  createEmployee,
  deleteEmployee,
  detailEmployee,
  getFormUpdateEmployee,
  updateEmployee,
};
