const express = require("express");
const employeeRouter = express.Router();
const EmployeeData = require("../model/Database").EmployeeData;

router = () => {
  employeeRouter.get("/", (req, res) => {
    EmployeeData.find()
      .then((employees) => {
        res.send(employees);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Database access error");
      });
  });

  employeeRouter.post("/", (req, res) => {
    let newEmp = req.body;
    EmployeeData(newEmp)
      .save()
      .then(() => {
        res.send();
      });
  });

  employeeRouter.get("/edit/:id", (req, res) => {
    let empId = req.params.id;
    EmployeeData.findById(empId)
      .then((employee) => {
        if (employee) res.send(employee);
        else throw Error("Employee not Found");
      })
      .catch((err) => {
        console.log(err);
        // Handle errors
        res.status(404).send("Not Found");
      });
  });

  employeeRouter.put("/edit/:id", (req, res) => {
    let empId = req.params.id;
    let updatedEmp = req.body;
    EmployeeData.findByIdAndUpdate(empId, updatedEmp)
      .then(() => {
        res.send();
      })
      .catch((err) => {
        console.log(err);
        // Handle errors
        res.status(500).send("Database write failed");
      });
  });

  employeeRouter.delete("/delete/:id", (req, res) => {
    let empId = req.params.id;
    EmployeeData.findByIdAndDelete(empId)
      .then(() => {
        res.send();
      })
      .catch((err) => {
        console.log(err);
        // Handle errors
        res.status(500).send("Database operation failed");
      });
  });

  return employeeRouter;
};

module.exports = router;
