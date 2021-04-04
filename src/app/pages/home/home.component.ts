/*
; ==============================
; Title: home.component.ts
; Author: Professor Krasso
; Date: 3/19/2021
; Modified By: Brooklyn Hairston
; Description: Home component
; ==============================
*/

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Employee } from 'src/app/shared/employee.interface';
import { Item } from 'src/app/shared/item.interface';
import { TaskService } from 'src/app/shared/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //variable declarations
  todo: Item[];
  done: Item[];
  employee: Employee;

  empId: string;

  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {

//maps the empId to the string variable
  this.empId = this.cookieService.get('session_user');

//api call to findAllTasks
  this.taskService.findAllTasks(this.empId).subscribe(res => {
    console.log('--Server response from findAllTasks--');
    console.log(res);

    //accesses the data field in the BaseResponse component and assigns it to the employee variable
    this.employee = res.data;

    //used to make sure we are receiving data from the employee object
    console.log('--Employee object--');
    console.log(this.employee);

    //error handler
  }, err => {
    console.log(err);

    //complete handler with a generic function
  }, () => {

    //on complete
    this.todo = this.employee.todo;
    this.done = this.employee.done;

    console.log('This is the complete section');
    console.log(this.todo);
    console.log(this.done);
  })

}
  ngOnInit(): void {

    }
/**
 * @description Opens the Create Task Dialog window
 */
    openCreateTaskDialog() {
      const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
        disableClose: true
      })

    dialogRef.afterClosed().subscribe(data => {
      if (data)
      {
        this.taskService.createTask({ empId: this.empId, task: data.text, date: data.dueDate, words: data.description }).subscribe(res => {
          this.employee = res.data;
        }, err => {
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    })
    }

    /**
     *
     * @param event
     */

    drop(event: CdkDragDrop<any[]>) {
      if (event.previousContainer === event.container)
      {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        console.log("Reordered item in an existing column/array");
        this.updateTaskList(this.empId, this.todo, this.done);
      }
      else
      {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        console.log("Moved task item to a different column/array");
        this.updateTaskList(this.empId, this.todo, this.done);
      }
    }

    /**
     *
     * @param taskId
     */

    deleteTask(taskId: string): void {
      if (taskId)
      {
        console.log(`Task item ${taskId} was deleted`);
        this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
          this.employee = res.data;
        }, err => {
          console.log(err);
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    }

    /**
     *
     * @param empId
     * @param todo
     * @param done
     * @description
     */

    private updateTaskList(empId: string, todo: Item[], done: Item[]): void {
      this.taskService.updateTask(empId, todo, done).subscribe(res => {
        this.employee = res.data;
      }, err => {
        console.log(err);
      }, () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      })
    }
  }
