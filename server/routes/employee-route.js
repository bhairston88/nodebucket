/*
; ==============================
; Title: employee-route.js
; Author: Professor Krasso
; Date: 3/19/2021
; Modified By: Brooklyn Hairston
; Description: Employee router
; ==============================
*/


//require statements
const express = require('express');
const Employee = require("../db-models/employee");
const BaseResponse = require('../service/base-response');


//create router
const router = express.Router();

/**
 * API: findEmployeeById
 * @param empId
 * @returns Employee document or null
 * @description Queries the Employee model using the empId and returns a error or an employee document

 */
router.get('/:empId', async(req, res) => {

  try
  {
    Employee.findOne({'empId': req.params.empId}, function(err, employee) {

      if (err)
      {
        console.log(err);

        const mongoDBErrorResponse = new BaseResponse('500', `MongoDB Native Error: ${err}`, null)

        res.json(mongoDBErrorResponse.toObject());
  }
  else
  {
    console.log(employee);

    const employeeResponse = new BaseResponse ('200', 'Successful query', employee);

    res.json(employeeResponse.toObject());

}
    })
}
  catch (e)
  {
    console.log(e);

    const findEmployeeCatchError = new BaseResponse('500',`Internal Server Error: ${e.message}`, null);

    res.json(findEmployeeCatchError.toObject());

  }

})

/**
 * API: createTask
 * @param empId
 * @description Creates a new record with a post request to the empId and saves the new record or returns an error message
 */
router.post('/:empId/tasks', async(req, res) => {
  try {

    Employee.findOne({ 'empId': req.params.empId}, function(err, employee) {

      if (err)
      {
        console.log(err);

        const CreateTaskMongoDbError = new BaseResponse('500', `MongoDb Exception: ${err.message}`, null)

        res.status(500).send(createTaskMongoDbError.toObject());
      } else {
        console.log(employee);

        const item = {
          text: req.body.text
        };

        employee.todo.push(item);

        employee.save(function(err, updatedEmployee) {

          if (err)
          {
            console.log(err);

            const createTaskOnSaveMongoDbError = new BaseResponse('500', `MongoDB onSave() exception: ${err.message}`, null);

            res.status(500).send(createTaskOnSaveMongoDbError.toObject());
          } else {
            console.log(updatedEmployee);

            const createTaskOnSaveSuccessResponse = new BaseResponse('200', 'Successful query', updatedEmployee);

            res.status(200).send(createTaskOnSaveSuccessResponse.toObject());
          }
        })
      }
    })
    //catches any exceptions and returns an error message
  } catch (e) {
    console.log(e);

    const createTaskCatchException = new BaseResponse('500' `Internal Server Error: ${e.message}`, null)

    res.json(createTaskCatchException.toObject());
  }
})

//export router
module.exports = router;
