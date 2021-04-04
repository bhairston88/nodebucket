/*
; ==============================
; Title: items.js
; Author: Professor Krasso
; Date: 3/23/2021
; Modified By: Brooklyn Hairston
; Description: Item model
; ==============================
*/


//require statements
const mongoose = require('mongoose');
const { mainModule } = require('process');
const Schema = mongoose.Schema;


/*Create new item schema */

let itemClass = new Schema({
  text: { type: String },
  dueDate: { type: String },
  description: { type: String }
})

//Export schema
module.exports = itemClass;
