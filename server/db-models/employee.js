/*
; ==============================
; Title: employee.js
; Author: Professor Krasso
; Date: 3/19/2021
; Modified By: Brooklyn Hairston
; Description: Employee model
; ==============================
*/

//require statements
const { builtinModules } = require('module');
const mongoose = require('mongoose');

//creates a new employee schema with an unique string object mapped to the employees collection
let employeeSchema = mongoose.Schema({
  empId: { type: String, unique: true }
}, {collection: "employees"});

//exports the Employee model
module.exports = mongoose.model("Employee", employeeSchema)
