const express = require("express");
const employeeRouter = express.Router();
const EmployeeData = require("../model/Database").EmployeeData;

// Get an array of all employees
employeeRouter.get("/", (req, res) => {
  EmployeeData.find()
    .then((employees) => {
      res.status(200).send(employees);
    })
    .catch((err) => {
      res.status(500).send("Database read error");
    });
});

// Add a new employee
employeeRouter.post("/", (req, res) => {
  let newEmp = req.body;
  EmployeeData(newEmp)
    .save()
    .then((emp) => {
      // Newly saved  document is available in emp variable
      res.status(200).send(emp);
    })
    .catch((err) => {
      // Handle errors
      res.status(500).send("Database write failed");
    });
});

// Get a single employee's details based on unique _id property of mongodb
employeeRouter.get("/edit/:id", (req, res) => {
  let empId = req.params.id;
  EmployeeData.findById(empId)
    .then((emp) => {
      if (emp) {
        res.status(200).send(emp);
      } else {      // No employee details received. ie: employee with the specified id does not exist
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      // Handle errors
      res.status(500).send("Database read failed");
    });
});

// Update details of an employee based on unique _id property of mongodb
employeeRouter.put("/edit/:id", (req, res) => {
  let empId = req.params.id;
  let updatedEmp = req.body;
  EmployeeData.findByIdAndUpdate(empId, updatedEmp, { new: true })
    .then((emp) => {
      if (emp) {
        res.status(200).send(emp);
      } else {    // No employee details received. ie: employee with the specified id does not exist
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      // Handle errors
      res.status(500).send("Database write failed");
    });
});

// Delete an employee based on unique _id property of mongodb
employeeRouter.delete("/delete/:id", (req, res) => {
  let empId = req.params.id;
  EmployeeData.findByIdAndDelete(empId)
    .then((emp) => {
      if (emp) {
        res.status(200).send(emp);
      } else {    // No employee details received. ie: employee with the specified id does not exist
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      // Handle errors
      res.status(500).send("Database operation failed");
    });
});

module.exports = employeeRouter;
