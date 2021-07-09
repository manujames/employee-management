const express = require("express");
const employeeRouter = express.Router();
const EmployeeData = require("../model/Database").EmployeeData;

router = () => {
  employeeRouter.get("/", (req, res) => {
    EmployeeData.find()
      .then((employees) => {
        res.status(200).send(employees);
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
      .then((emp) => {
        // Newly saved  document is available in emp variable
        res.status(200).send(emp);
      })
      .catch((err) => {
        console.log(err);
        // Handle errors
        res.status(500).send("Database write failed");
      });
  });

  employeeRouter.get("/edit/:id", (req, res) => {
    let empId = req.params.id;
    EmployeeData.findById(empId)
      .then((emp) => {
        if (emp) {
          res.status(200).send(emp);
        }
        else{
          res.status(404).send("Not Found");
        } 
      })
      .catch((err) => {
        console.log(err);
        // Handle errors
        res.status(500).send("Database read failed");
      });
  });

  employeeRouter.put("/edit/:id", (req, res) => {
    let empId = req.params.id;
    let updatedEmp = req.body;
    EmployeeData.findByIdAndUpdate(empId, updatedEmp, {new:true})
      .then((emp) => {
        if (emp) {
          res.status(200).send(emp);
        }
        else{
          res.status(404).send("Not Found");
        }
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
      .then((emp) => {
        if (emp) {
          res.status(200).send(emp);
        } else {
          res.status(404).send("Not Found");
        }
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
