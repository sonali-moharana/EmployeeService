const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Employee = require('./model/employeedetails');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://Sonali:Employee%40123@cluster0.btcyhfh.mongodb.net/EmployeeData', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define API endpoints

// Create a new employee record
app.post('/employees', (req, res) => {
  const employee = new Employee(req.body);
  employee.save()
    .then(savedEmployee => {
      res.status(201).json(savedEmployee);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Retrieve all employees
app.get('/employees', (req, res) => {
  Employee.find({})
    .then(employees => {
      res.status(200).json(employees);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Retrieve an employee by ID
app.get('/employees/:id', (req, res) => {
  Employee.findById(req.params.id)
    .then(employee => {
      if (!employee) {
        res.status(404).send('Employee not found');
      } else {
        res.status(200).json(employee);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Update an employee by ID
app.put('/employees/:id', (req, res) => {
  Employee.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(employee => {
      if (!employee) {
        res.status(404).send('Employee not found');
      } else {
        res.status(200).json(employee);
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Delete an employee by ID
app.delete('/employees/:id', (req, res) => {
  Employee.findOneAndDelete(req.params.id)
    .then(employee => {
      if (!employee) {
        res.status(404).send('Employee not found');
      } else {
        res.status(204).send("Employee Deleted Successfully");
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
