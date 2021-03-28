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
 * @returns A new record or null
 * @description Queries the Employee model using empId, returns an employee document and creates a new record with a post request to the document
 * saves the new record or returns an error message
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


        if (employee) {
          const item = {
            text: req.body.text,
            dueDate: req.body.dueDate,
            description: req.body.description
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
        } else {
          console.log('Invalid employeeId')

          const invalidEmployeeIdResponse = new BaseResponse('200', 'Invalid employeeId', null);

          res.status(200).send(invalidEmployeeIdResponse)
        }
      }
    })
  }
   catch (e) {
    console.log(e);

    const createTaskCatchException = new BaseResponse('500' `Internal Server Error: ${e.message}`, null)

    res.json(createTaskCatchException.toObject());
  }
})

/**
 * API: findAllTasks
 * @param empId
 * @returns All the tasks stored in an employee document or null
 * @description Queries the database for an employee record and outputs the all tasks stored in that document
 */

 router.get('/:empId/tasks', async(req, res) => {

  try
  {
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err,employee) {

      if (err) {
        console.log(err);
        const mongoDBFindAllTasksException = new BaseResponse('500', `Internal server error ${err.message}`, null);

        res.status(500).send(mongoDBFindAllTasksException.toObject());

      }
      else {
        console.log(employee);

        const employeeTaskResponse = new BaseResponse('200', 'Query successful', employee);
        res.status(200).send(employeeTaskResponse.toObject());

      }
    })
  }
  catch (e) {
    console.log(e);

    const errorCatchResponse = new BaseResponse('500', `Internal server error ${e.message}`, null);

    res.status(500).send(errorCatchResponse.toObject());


  }
 })

 /**
  * API: updateTask
  * @param empId
  * @returns An updated employee document or null
  * @description Queries the collection for an employee document and updates the document
  */

  router.put('/:empId/tasks', async(req, res) => {
    try
    {
      Employee.findOne({'empId': req.params.empId}, function(err, employee)
      {
        if (err)
        {
          console.log(err);
          const updateTaskMongoDBException = new BaseResponse('500', `Internal server error ${err.message}`, null);

          res.status(500).send(updateTaskMongoDBException.toObject());
        }
        else{
          console.log(employee);

          if (employee)
          {
            employee.set({
              todo: req.body.todo,
              done: req.body.done
            });

            employee.save(function(err, updatedEmployee) {

              if (err)
              {
                console.log(err);
                const updateTaskMongoDBError = new BaseResponse('500', `Internal server error ${err.message}`, null);
                res.status(500).send(updateTaskMongoDBError.toObject());
              }
              else{
                console.log(updatedEmployee);

                const updatedTaskSuccessResponse = new BaseResponse('200', 'Query successful', updatedEmployee);

                res.status(200).send(updatedTaskSuccessResponse.toObject());

              }
            })
          }
          else {
            console.log(`Invalid employeeId! The passed-in value was ${req.params.empId}`, null);

            const invalidEmployeeIdResponse = new BaseResponse('200', 'Invalid employeeId', null);
            res.status(200).send(invalidEmployeeIdResponse.toObject());
          }
        }
      })
    }
    catch (e)
    {
      console.log(e);
      const updateTaskCatchResponse = new BaseResponse('500', `Internal server error ${e.message}`, null);
      res.status(500).send(updateTaskCatchResponse.toObject());
    }
  })

  /**
   * API: deleteTask
   * @param empId
   * @returns If todo and done are null returns an error message, if the item is found logs it to the console, removes the document from the record and updates the record
   * @description Checks the todo and done arrays for the item document id and removes the document from the record
   *
   */
  router.delete('/:empId/tasks/:taskId', async(req, res) => {
    try
    {
      Employee.findOne({'empId': req.params.empId}, function(err, employee)
    {
        if (err)
        {
          console.log(err);

          const deleteTaskMongoDBError = new BaseResponse('500', `Internal server error ${err.message}`, null);

          res.status(500).send(deleteTaskMongoDBError.toObject());
        }
        else
        {
          console.log(employee);

          const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);

          const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

          if (todoItem)
          {
            console.log(todoItem);

            employee.todo.id(todoItem._id).remove();

            employee.save(function(err, updatedTodoItemEmployee) {
              if (err)
              {
                console.log(err);

                const deleteTodoItemMongoDBError = new BaseResponse('500', `Internal server error ${err.message}`, null);

                res.status(500).send(deleteTodoItemMongoDBError.toObject());
              }
              else
              {
                console.log(updatedTodoItemEmployee);

                const deleteTodoItemSuccess = new BaseResponse('200', 'Query successful', updatedTodoItemEmployee);

                res.status(200).send(deleteTodoItemSuccess.toObject());
              }
            })
          }
          else if (doneItem)
          {
            console.log(doneItem);

            employee.done.id(doneItem._id).remove();

            employee.save(function(err, updatedDoneItemEmployee) {
              if (err)
              {
                console.log(err);

                const deleteDoneItemMongoDBError = new BaseResponse('500', `Internal server error ${err.message}`, null);

                res.status(500).send(deleteDoneItemMongoDBError.toObject());
              }
              else
              {
                console.log(updatedDoneItemEmployee);

                const deleteDoneItemSuccess = new BaseResponse('200', 'Query successful', updatedDoneItemEmployee);

                res.status(200).send(updatedDoneItemEmployee.toObject());
              }
            })
          }
        else
          {
            console.log(`Invalid taskId; passed-in value ${req.params.taskId}`);

            const invalidTaskResponse = new BaseResponse('200', 'Invalid taskId', null);

            res.status(200).send(invalidTaskResponse.toObject());
          }
        }
      })
    }
    catch (e)
    {
      console.log(e);

      const deleteTaskCatchError = new BaseResponse('500', `Internal server error ${e.message}`, null);

      res.status(500).send(deleteTaskCatchError.toObject());
    }
  })

//export router
module.exports = router;
