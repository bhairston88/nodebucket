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
//const { builtinModules } = require('module');
const mongoose = require('mongoose');
//import schema
const Item = require('./item');

//creates a new employee schema with an unique string object and two arrays mapped to the employees collection
let employeeSchema = mongoose.Schema({
  empId: { type: String, unique: true },
  todo: [Item],
  done: [Item]
}, { collection: "employees" });

//exports the Employee model
module.exports = mongoose.model("Employee", employeeSchema)
