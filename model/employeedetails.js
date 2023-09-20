const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  position: String,
  salary: Number,
  hireDate: Date,
});

module.exports = mongoose.model('Employee', employeeSchema);
